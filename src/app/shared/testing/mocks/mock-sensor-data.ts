export const MockSensorMulti = {
  chart: {
    type: 'line'
  },
  dataType: 'multi',
  doc: 'Acceleration item for a dataset with gravitational constant g as unit.',
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
