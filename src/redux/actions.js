export const INPUT_VALUE = "INPUT_VALUE";

/*ACTION CREATORS*/
export function actionInputValue(data) {
  return {
    type: INPUT_VALUE,
    payload: data
  }
}
