export class LogAggregationRequest {

  constructor(
    public offset: number,
    public aggregationBy: LogAggregationByType,
    public lowTimestampFilter: number,
    public highTimestampFilter: number
  ) { }

}

export enum LogAggregationByType {
  Yearly = 'Yearly',
  Monthly = 'Monthly',
  Daily = 'Daily'
}
