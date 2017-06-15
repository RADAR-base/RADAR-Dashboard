export interface Config {
  sensor: {
    [id: string]: {
      keys?: Key[],
      label: Label
    }
  }
  stat: {
    [id: string]: {
      label: Label
    }
  }
  timeInterval: {
    [id: string]: {
      value: number,
      label: Label
    }
  }
  unit: {
    [id: string]: {
      label: Label
    }
  }
}

interface Key {
  key: string
  label: Label
}

interface Label {
  EN: string
}
