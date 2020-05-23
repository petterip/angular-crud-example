/* tslint:disable */
export interface Patient {

  /**
   * Name of the archive
   */
  archive?: string;

  /**
   * Name of an attachment
   */
  attachment?: string;

  /**
   * Id of the patient
   */
  id: number;

  /**
   * Name of the patient
   */
  name: string;

  /**
   * Name of the project
   */
  project?: string;
}
