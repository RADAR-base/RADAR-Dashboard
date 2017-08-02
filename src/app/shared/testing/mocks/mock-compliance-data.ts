export interface Compliance {
  date: string,
  compliances: Values[]
}

export interface Values {
  type: string,
  compliance: number
}

export const MockComplianceData: Compliance[] = [
  {
    date: 'A',
    compliances: [
      { type: 'Simple',
        compliance: .05167
      },
      { type: 'Special',
        compliance: .08167
      }
    ]
  },
  {
    date: 'B',
    compliances: [
      { type: 'Simple',
        compliance: .03167
      },
      { type: 'Special',
        compliance: .1167
      }
    ]
  },
  {
    date: 'C',
    compliances: [
      { type: 'Simple',
        compliance: .01167
      },
      { type: 'Special',
        compliance: .08167
      }
    ]
  },
  {
    date: 'D',
    compliances: [
      { type: 'Simple',
        compliance: .05167
      },
      { type: 'Special',
        compliance: .02167
      }
    ]
  } 
];
