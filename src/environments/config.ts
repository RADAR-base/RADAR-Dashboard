export const Config = {
  sourceData: {
    ACCELEROMETER: {
      chart: {
        type: 'line',
        gradient: false,
        timeHoles: true,
        dataType: 'multi'
      },
      doc:
        'Acceleration item for a dataset with gravitational constant g as unit.',
      keys: [
        {
          doc: 'Acceleration x axis with gravitational constant g as unit.',
          key: 'x',
          label: { EN: 'X Coord' }
        },
        {
          doc: 'Acceleration y axis with gravitational constant g as unit.',
          key: 'y',
          label: { EN: 'Y Coord' }
        },
        {
          doc: 'Acceleration z axis with gravitational constant g as unit.',
          key: 'z',
          label: { EN: 'Z Coord' }
        }
      ],
      label: { EN: 'Accelerometer' }
    },
    BATTERY: {
      chart: {
        type: 'line',
        gradient: false,
        timeHoles: true,
        dataType: 'single'
      },
      doc: 'Battery level in percentage as unit.',
      label: { EN: 'Battery' }
    },
    BLOOD_VOLUME_PULSE: {
      chart: {
        type: 'line',
        gradient: false,
        timeHoles: true,
        dataType: 'single'
      },
      doc:
        'Blood volumne pulse from photoplethysmograph expressed in light absorption (nW).',
      label: { EN: 'Blood Volume Pulse' }
    },
    ELECTRODERMAL_ACTIVITY: {
      chart: {
        type: 'line',
        gradient: false,
        timeHoles: true,
        dataType: 'single'
      },
      doc: 'Electrodermal activity in microsiemens (µS) as unit.',
      label: { EN: 'Electrodermal Activity' }
    },
    HEART_RATE: {
      chart: {
        type: 'line',
        gradient: true,
        timeHoles: true,
        dataType: 'single'
      },
      doc:
        'Heart Rate resulting from data aggregation. It is computed as (60 / ibi)',
      keys: [{ key: 'value', label: { EN: 'Heart Rate' } }],
      label: { EN: 'Heart Rate' }
    },
    INTER_BEAT_INTERVAL: {
      chart: {
        type: 'line',
        gradient: false,
        timeHoles: true,
        dataType: 'single'
      },
      doc: 'Time between individal heat beats.',
      label: { EN: 'Inter Beat Interval' }
    },
    THERMOMETER: {
      chart: {
        type: 'line',
        gradient: false,
        timeHoles: true,
        dataType: 'single'
      },
      dataType: 'single',
      doc: 'Temperature value expressed in Celsius (°C) scale',
      label: { EN: 'Thermometer' }
    }
  },
  compliance: {
    keys: [
      {
        doc: 'Simple compliance.',
        key: 'simple',
        label: { EN: 'Simple Compliance' }
      },
      {
        doc: 'Special Compliance',
        key: 'special',
        label: { EN: 'Special Compliance' }
      }
    ]
  },
  stats: {
    AVERAGE: {
      doc:
        'The sum of a list of numbers divided by the number of numbers in the list.',
      label: { EN: 'Average' }
    },
    COUNT: {
      doc: 'The number of occurances within a set of data.',
      label: { EN: 'Count' }
    },
    INTERQUARTILE_RANGE: {
      doc:
        'A measure of statistical dispersion, being equal to the difference between 75th and 25th percentiles, or between upper and lower quartiles.',
      label: { EN: 'Interquartile Range' }
    },
    LOWER_QUARTILE: {
      doc:
        'A point at the 1st quartile or 25th percentile in a ranked set of data values.',
      label: { EN: 'Lower Quartile' }
    },
    MAXIMUM: {
      doc: 'The most extreme value in set.',
      label: { EN: 'Maximum' }
    },
    MEDIAN: {
      doc:
        'The median is the value separating the higher half of a set of values from the lower half. ',
      label: { EN: 'Median' }
    },
    MINIMUM: {
      doc: 'The least or the smallest value in a set.',
      label: { EN: 'Minimum' }
    },
    QUARTILES: {
      doc:
        'The quartiles of a ranked set of data values are the three points that divide the data set into four equal groups.',
      label: { EN: 'Quartiles' }
    },
    SUM: {
      doc: 'The result of the addition of a sequence of numbers.',
      label: { EN: 'Sum' }
    },
    UPPER_QUARTILE: {
      doc:
        'A point at the 3rd quartile or 75th percentile in a ranked set of data values.',
      label: { EN: 'Upper Quartile' }
    }
  },
  timeIntervals: {
    ONE_WEEK: {
      doc: '1 week time interval',
      label: { EN: '1w' },
      value: 604800000
    },
    ONE_DAY: {
      doc: '1 day time interval',
      label: { EN: '1d' },
      value: 86400000
    },
    ONE_HOUR: {
      doc: '1 hour time interval',
      label: { EN: '1h' },
      value: 3600000
    },
    TEN_MIN: {
      doc: '10 minutes time interval',
      label: { EN: '10m' },
      value: 600000
    },
    ONE_MIN: {
      doc: '1 minute time interval',
      label: { EN: '1m' },
      value: 60000
    },
    TEN_SECOND: {
      doc: '10 seconds time interval',
      label: { EN: '10s' },
      value: 10000
    },
    doc: 'Available time intervals in which requested data is returned.'
  },
  units: {
    BEATS_PER_MIN: {
      doc: 'Number of events (heart beats) per minute.',
      label: { EN: 'Beats per Minute' }
    },
    CELSIUS: {
      doc:
        'Celsius, also known as centigrade, is a metric scale and unit of measurement for temperature.',
      label: { EN: '°Celsius' }
    },
    G: {
      doc:
        'The g-force (with g from gravitational) is a measurement of the type of acceleration that causes a perception of weight',
      label: { EN: 'G Force' }
    },
    PERCENTAGE: {
      label: { EN: 'Percentage' }
    },
    NANO_WATT: {
      label: { EN: 'Nanowatt' }
    },
    MICRO_SIEMENS: {
      label: { EN: 'Microsiemens' }
    },
    doc: 'All possible units requested data is returned as.'
  }
}
