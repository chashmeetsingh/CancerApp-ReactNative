import validate from './validate.min.js'

const constraints = {
  title: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  affiliation: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  location: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  experience: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  research_fields: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  website_link: {
    presence: true,
    url: true
  },
  keywords: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  bio: {
    presence: true,
    length: {
      maximum: 500,
      minimum: 1
    }
  },
  projectURL: {
    presence: true,
    url: true
  },
  idea: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  question: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  projectData: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  eventName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  eventLocation: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  eventDescription: {
    presence: true,
    length: {
      minimum: 1
    }
  }
};

export default function validator(field, value) {

  let fields = {}
  fields[field] = value;

  var constraint = {}
  constraint[field] = constraints[field]

  const result = validate(fields, constraint)
  // console.log(fields, constraint, result)

  if (result) {
    return result[field][0]
  }

  return null
}
