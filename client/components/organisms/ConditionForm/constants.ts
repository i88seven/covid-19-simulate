import moment from 'moment';

export interface Conditions {
  meetFrequency: number;
  peoplePerMeet: number;
  incubationPeriod: number;
  infectionProbability: number;
  recoverPeriod: number;
  population: number;
  initialInfected: number;
  startDate: moment.Moment;
}
