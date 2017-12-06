
export class LogAggregation {

  public constructor(
    public logs: Object
  ) { }

}

export class MetricContainer {

  public constructor(
    public metric1: LogAggregationRecord,
    public metric2: LogAggregationRecord,
    public metric3: LogAggregationRecord
  ) { }

}

export class LogAggregationRecord {

  constructor(
    public minimum: number,
    public mean: number,
    public maximum: number
  ) { }

}
