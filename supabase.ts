import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
export const supabase = createClient(url, key);
export const COACH_ID = import.meta.env.VITE_COACH_ID as string;

// Auth
export const signIn = (email:string, password:string) =>
  supabase.auth.signInWithPassword({ email, password });
export const signUp = (email:string, password:string, fullName:string) =>
  supabase.auth.signUp({ email, password, options:{ data:{ full_name:fullName } } });
export const signOut = () => supabase.auth.signOut();

// Profile
export const getProfile = (id:string) =>
  supabase.from('profiles').select('*').eq('id',id).single();
export const updateProfile = (id:string, data:any) =>
  supabase.from('profiles').update(data).eq('id',id).select().single();

// Programs
export const getPrograms = () =>
  supabase.from('programs').select('*').eq('is_active',true).order('level');
export const getAthleteProgram = (athleteId:string) =>
  supabase.from('athlete_programs').select('*, program:programs(*)').eq('athlete_id',athleteId).eq('is_active',true).single();

// Sessions
export const getWeekSessions = (programId:string, week:number) =>
  supabase.from('training_sessions').select('*').eq('program_id',programId).eq('week_number',week).order('day_of_week');
export const logSession = (athleteId:string, sessionId:string, notes?:string, effort?:number) =>
  supabase.from('session_logs').insert({ athlete_id:athleteId, session_id:sessionId, notes, perceived_effort:effort }).select().single();
export const getSessionLogs = (athleteId:string, limit=30) =>
  supabase.from('session_logs').select('*, session:training_sessions(*)').eq('athlete_id',athleteId).order('completed_at',{ascending:false}).limit(limit);

// Personal bests
export const getPersonalBests = (athleteId:string) =>
  supabase.from('personal_bests').select('*').eq('athlete_id',athleteId).order('event');

// Messages
export const getMessages = (userId:string, otherId:string) =>
  supabase.from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
    .order('created_at',{ascending:true});
export const sendMessage = (senderId:string, receiverId:string, content:string) =>
  supabase.from('messages').insert({ sender_id:senderId, receiver_id:receiverId, content }).select().single();
export const markRead = (receiverId:string, senderId:string) =>
  supabase.from('messages').update({is_read:true}).eq('receiver_id',receiverId).eq('sender_id',senderId).eq('is_read',false);
export const subscribeMessages = (userId:string, cb:(m:any)=>void) =>
  supabase.channel('messages').on('postgres_changes',
    { event:'INSERT', schema:'public', table:'messages', filter:`receiver_id=eq.${userId}` },
    p => cb(p.new)
  ).subscribe();

// Supplements
export const getSupplementProtocol = (athleteId:string, sprintType:string) =>
  supabase.from('supplement_protocols').select('*').eq('athlete_id',athleteId).eq('sprint_type',sprintType).order('is_individual',{ascending:false}).limit(1).single();
