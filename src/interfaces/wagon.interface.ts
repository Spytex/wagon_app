export interface IWagon {
  Date: string;
  VagonNumber: string;
  VagonType: string;
  VagonIsCovered: boolean;
  WeightBrutto: number;
  WeightNet: number;
  WeghtTare: number;
  ProcessingKind: string;
  OperationKind: string;
  CargoName: string;
  ClientName: string;
  OwnerName: string;
  IsPrivate: boolean;
  ShipperName: string;
  ReceiverName: string;
  RailwayOwn: string;
  NumberOfPlaces: number;
  ShipperOrder: string;
  RailbillNumber: string;
  Capacity: number;
  DepartureStationName: string;
  CargoStamps: string;
  Characteristic: string;
  DestinationCountryName: string;
  OperatorName: string;
  Status: number;
  RecordNumber: number;
}

export interface IWagonData {
  Vagons: IWagon[];
}

export interface IWagonDataSingle {
  Wagon: IWagon;
}
