/* tslint:disable */
export interface Patient {

  /**
   * Sample attachment filename
   */
  attachment?: string;

  /**
   * Id of the patient
   */
  id: number;

  /**
   * Sample match percentage compared to a baseline
   */
  match?: number;

  /**
   * Name of the patient
   */
  name: string;

  /**
   * Research project name
   */
  project?: string;
}
