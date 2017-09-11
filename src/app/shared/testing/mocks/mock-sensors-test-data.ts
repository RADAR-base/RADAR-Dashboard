export const PayloadSingle = {
  subjectId: 'MRC01',
  data: {
    chart: {
      type: 'line'
    },
    dataType: 'single',
    doc: 'Battery level in percentage as unit.',
    label: {
      EN: 'Battery'
    },
    unit: 'PERCENTAGE',
    type: 'BATTERY',
    visible: true,
    source: '00:07:80:1F:52:F3',
    id: 0
  }
}
export const PayloadMulti = {
  subjectId: 'MRC01',
  data: {
    chart: {
      type: 'line'
    },
    dataType: 'multi',
    doc:
      'Acceleration item for a dataset with gravitational constant g as unit.',
    keys: [
      {
        doc: 'Acceleration x axis with gravitational constant g as unit.',
        key: 'x',
        label: {
          EN: 'X Coord'
        }
      },
      {
        doc: 'Acceleration y axis with gravitational constant g as unit.',
        key: 'y',
        label: {
          EN: 'Y Coord'
        }
      },
      {
        doc: 'Acceleration z axis with gravitational constant g as unit.',
        key: 'z',
        label: {
          EN: 'Z Coord'
        }
      }
    ],
    label: {
      EN: 'Accelerometer'
    },
    unit: 'G',
    type: 'ACCELEROMETER',
    visible: true,
    source: '00:07:80:1F:52:F3',
    id: 4
  }
}

export const endTime = 1497689980000
export const startTime = new Date(endTime).setDate(
  new Date(endTime).getDate() - 1
)
