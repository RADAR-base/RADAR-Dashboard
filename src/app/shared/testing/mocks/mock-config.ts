export const MockConfig = {
  config: {
    sensors: {
      ACCELEROMETER: {
        dataType: 'multi',
        chart: {
          type: 'line'
        },
        doc:
          'Acceleration item for a dataset with gravitational constant g as unit.',
        label: {
          EN: 'Accelerometer'
        },
        unit: 'G',
        keys: [
          {
            key: 'x',
            doc: 'Acceleration x axis with gravitational constant g as unit.',
            label: {
              EN: 'X Coord'
            }
          },
          {
            key: 'y',
            doc: 'Acceleration y axis with gravitational constant g as unit.',
            label: {
              EN: 'Y Coord'
            }
          },
          {
            key: 'z',
            doc: 'Acceleration z axis with gravitational constant g as unit.',
            label: {
              EN: 'Z Coord'
            }
          }
        ]
      },
      BATTERY: {
        dataType: 'single',
        chart: {
          type: 'line'
        },
        doc: 'Battery level in percentage as unit.',
        label: {
          EN: 'Battery'
        },
        unit: 'PERCENTAGE'
      },
      BLOOD_VOLUME_PULSE: {
        dataType: 'single',
        chart: {
          type: 'line'
        },
        doc:
          'Blood volumne pulse from photoplethysmograph expressed in light absorption (nW).',
        label: {
          EN: 'Blood Volume Pulse'
        },
        unit: 'NANOWATT'
      },
      ELECTRODERMAL_ACTIVITY: {
        dataType: 'single',
        chart: {
          type: 'line'
        },
        doc: 'Electrodermal activity in microsiemens (µS) as unit.',
        label: {
          EN: 'Electrodermal Activity'
        },
        unit: 'MICROSIEMENS'
      },
      INTER_BEAT_INTERVAL: {
        dataType: 'single',
        chart: {
          type: 'line'
        },
        doc: 'Time between individal heat beats.',
        label: {
          EN: 'Inter Beat Interval'
        },
        unit: 'BEATS_PER_MIN'
      },
      HEART_RATE: {
        dataType: 'single',
        chart: {
          type: 'line',
          gradient: true
        },
        doc:
          'Heart Rate resulting from data aggregation. It is computed as (60 / ibi)',
        label: {
          EN: 'Heart Rate'
        },
        keys: [
          {
            key: 'value',
            label: {
              EN: 'Heart Rate'
            }
          }
        ],
        unit: 'BEATS_PER_MIN'
      },
      THERMOMETER: {
        dataType: 'single',
        chart: {
          type: 'line'
        },
        doc: 'Temperature value expressed in Celsius (°C) scale',
        label: {
          EN: 'Thermometer'
        },
        unit: 'CELSIUS'
      }
    },
    stats: {
      AVERAGE: {
        doc:
          'The sum of a list of numbers divided by the number of numbers in the list.',
        label: {
          EN: 'Average'
        }
      },
      COUNT: {
        doc: 'The number of occurances within a set of data.',
        label: {
          EN: 'Count'
        }
      },
      MAXIMUM: {
        doc: 'The most extreme value in set.',
        label: {
          EN: 'Maximum'
        }
      },
      MEDIAN: {
        doc:
          'The median is the value separating the higher half of a set of values from the lower half. ',
        label: {
          EN: 'Median'
        }
      },
      MINIMUM: {
        doc: 'The least or the smallest value in a set.',
        label: {
          EN: 'Minimum'
        }
      },
      SUM: {
        doc: 'The result of the addition of a sequence of numbers.',
        label: {
          EN: 'Sum'
        }
      },
      INTERQUARTILE_RANGE: {
        doc:
          'A measure of statistical dispersion, being equal to the difference between 75th quartiles.',
        label: {
          EN: 'Interquartile Range'
        }
      },
      LOWER_QUARTILE: {
        doc:
          'A point at the 1st quartile or 25th percentile in a ranked set of data values.',
        label: {
          EN: 'Lower Quartile'
        }
      },
      UPPER_QUARTILE: {
        doc:
          'A point at the 3rd quartile or 75th percentile in a ranked set of data values.',
        label: {
          EN: 'Upper Quartile'
        }
      },
      QUARTILES: {
        doc:
          'The quartiles of a ranked set of data values are the three points that divide the data',
        label: {
          EN: 'Quartiles'
        }
      }
    },
    units: {
      BEATS_PER_MIN: {
        doc: 'Number of events (heart beats) per minute.',
        label: {
          EN: 'Beats per Minute'
        }
      },
      G: {
        doc:
          'The g-force (with g from gravitational) is a measurement of the type of acceleration that',
        label: {
          EN: 'G Force'
        }
      },
      C: {
        doc:
          'Celsius, also known as centigrade, is a metric scale and unit of measurement for temperature.',
        label: {
          EN: '°C'
        }
      }
    },
    timeIntervals: {
      TEN_SECOND: {
        doc: '10 seconds time interval',
        value: 10000,
        label: {
          EN: '10s'
        }
      },
      THIRTY_SECOND: {
        doc: '30 seconds time interval',
        value: 30000,
        label: {
          EN: '30s'
        }
      },
      ONE_MIN: {
        doc: '1 minute time interval',
        value: 60000,
        label: {
          EN: '1m'
        }
      },
      TEN_MIN: {
        doc: '10 minutes time interval',
        value: 600000,
        label: {
          EN: '10m'
        }
      },
      ONE_HOUR: {
        doc: '1 hour time interval',
        value: 3600000,
        label: {
          EN: '1h'
        }
      },
      ONE_DAY: {
        doc: '1 day time interval',
        value: 86400000,
        label: {
          EN: '1d'
        }
      },
      ONE_WEEK: {
        doc: '1 week time interval',
        value: 604800000,
        label: {
          EN: '1w'
        }
      }
    },
    specs: {
      EMPATICA: [
        'BATTERY',
        'INTER_BEAT_INTERVAL',
        'HEART_RATE',
        'THERMOMETER',
        'ACCELEROMETER',
        'ELECTRODERMAL_ACTIVITY',
        'BLOOD_VOLUME_PULSE'
      ]
    },
    compliance: {
      keys: [
        {
          key: 'simple',
          label: {
            EN: 'Simple Compliance'
          }
        },
        {
          key: 'special',
          label: {
            EN: 'Special Compliance'
          }
        }
      ]
    }
  }
}
