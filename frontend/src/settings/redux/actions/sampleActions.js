import { TEST } from "../constants/sampleConstants";

export const counterAction = (string) => (dispatch) => {
    dispatch({ type: TEST, payload: string })
};

