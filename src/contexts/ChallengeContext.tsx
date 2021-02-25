import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

// Interface para tratamento do Challenge.json ou do banco
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
// Interface para trabalhar com tipagem do Typescript
interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;

    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

// Interface para realizar a tipagem do children
interface ChallengesProviderProps{
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

// Função para realizar o contexto
export function ChallengesProvider({ children } : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
    }

    // Função para iniciar um novo desafio
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ⚡️ ', {
                body: `Valendo ${challenge.amount}xp`
            });
        }
    }

    // Função para reiniciar um desafio
    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }

        setCurrrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience,
                challengesCompleted, 
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}