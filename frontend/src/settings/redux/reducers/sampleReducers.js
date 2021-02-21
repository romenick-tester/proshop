import { TEST } from "../constants/sampleConstants";

export const counterReducer = (state = 0, action) => {
    const { type, payload } = action;

    switch(type) {
        case TEST:
            if(payload === "inc"){
                return state + 1;
            } else {
                return state - 1;
            }
        default:
            return state;
    }
}