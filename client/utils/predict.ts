export interface RangeValues {
  min: number;
  max: number;
  mean: number;
}

export interface PredictOptions {
  incubationPeriod: RangeValues;
  meetFrequency: RangeValues;
  peoplePerMeet: RangeValues;
  infectionProbability: number;
  population: number;
  preInfected: number;
  preLatent: number;
  preRecovered: number;
}

export interface PredictResult {
  infected: number;
  latent: number;
  recovered: number;
}

/**
 * パラメータと前日の情報から感染者と潜在感染者の予測を出す
 * @param {number} target
 * @param {number} benchmark
 * @returns {number}
*/
export default function predict({}: PredictOptions): PredictResult {
  // TODO
  return {
    infected: 100,
    latent: 100,
    recovered: 100,
  };
}
