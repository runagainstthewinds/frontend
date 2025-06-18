export enum AchievementType {
    FIRST_RUN = 1,
    EARLY_BIRD = 2,
    NIGHT_OWL = 3,
    FIVE_KM = 4,
    TEN_KM = 5,
    HALF_MARATHON = 6,
    MARATHON = 7
}

export interface Achievement {
    id: AchievementType;
    title: string;
    description: string;
}

export const ACHIEVEMENTS: Record<AchievementType, Achievement> = {
    [AchievementType.FIRST_RUN]: {
        id: AchievementType.FIRST_RUN,
        title: "First Run",
        description: "Completed your first run"
    },
    [AchievementType.EARLY_BIRD]: {
        id: AchievementType.EARLY_BIRD,
        title: "Early Bird",
        description: "Completed a run before 6 AM"
    },
    [AchievementType.NIGHT_OWL]: {
        id: AchievementType.NIGHT_OWL,
        title: "Night Owl",
        description: "Completed a run after 9 PM"
    },
    [AchievementType.FIVE_KM]: {
        id: AchievementType.FIVE_KM,
        title: "5K Runner",
        description: "Completed a 5K run"
    },
    [AchievementType.TEN_KM]: {
        id: AchievementType.TEN_KM,
        title: "10K Runner",
        description: "Completed a 10K run"
    },
    [AchievementType.HALF_MARATHON]: {
        id: AchievementType.HALF_MARATHON,
        title: "Half Marathon",
        description: "Completed a half marathon"
    },
    [AchievementType.MARATHON]: {
        id: AchievementType.MARATHON,
        title: "Marathon",
        description: "Completed a full marathon"
    }
}; 