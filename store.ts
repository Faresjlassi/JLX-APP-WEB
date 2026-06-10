import { create } from 'zustand';
import type { Profile, AthleteProgram, PersonalBest } from '@/types';

interface AuthStore {
  session: any; profile: Profile|null; loading: boolean;
  setSession:(s:any)=>void; setProfile:(p:Profile|null)=>void; setLoading:(l:boolean)=>void; clear:()=>void;
}
export const useAuthStore = create<AuthStore>(set=>({
  session:null, profile:null, loading:true,
  setSession:s=>set({session:s}),
  setProfile:p=>set({profile:p}),
  setLoading:l=>set({loading:l}),
  clear:()=>set({session:null,profile:null,loading:false}),
}));

interface AppStore {
  athleteProgram:AthleteProgram|null; personalBests:PersonalBest[]; unread:number;
  setAthleteProgram:(p:AthleteProgram|null)=>void;
  setPersonalBests:(p:PersonalBest[])=>void;
  setUnread:(n:number)=>void;
}
export const useAppStore = create<AppStore>(set=>({
  athleteProgram:null, personalBests:[], unread:0,
  setAthleteProgram:p=>set({athleteProgram:p}),
  setPersonalBests:p=>set({personalBests:p}),
  setUnread:n=>set({unread:n}),
}));
