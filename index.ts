export interface Profile{id:string;email:string;full_name:string;role:'athlete'|'coach';avatar_url:string|null;nationality:string|null;events:string[];created_at:string;}
export interface Program{id:string;level:number;tier:string;name:string;price_cents:number;is_subscription:boolean;duration_weeks:number|null;events:string[];description:string;features:string[];icon:string;color:string;badge:string|null;}
export interface AthleteProgram{id:string;athlete_id:string;program_id:string;week_number:number;is_active:boolean;program?:Program;}
export interface TrainingSession{id:string;program_id:string;athlete_id:string|null;week_number:number;day_of_week:number;session_type:'speed'|'strength'|'recovery'|'rest';title:string;description:string;exercises:{name:string;sets?:number;reps?:number;distance?:string;rest?:string;notes?:string}[];duration_minutes:number|null;}
export interface SessionLog{id:string;athlete_id:string;session_id:string;completed_at:string;notes:string|null;perceived_effort:number|null;session?:TrainingSession;}
export interface PersonalBest{id:string;athlete_id:string;event:string;time_seconds:number;date_achieved:string|null;competition:string|null;}
export interface Message{id:string;sender_id:string;receiver_id:string;content:string;is_read:boolean;created_at:string;}
