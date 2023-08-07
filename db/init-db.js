db.createUser({
  user: 'root',
  pwd: 'toor',
  roles: [
      {
          role: 'readWrite',
          db: 'testDB',
      },
  ],
});

// Connect to the MongoDB server
const conn = new Mongo();

// Choose the database you want to use
const db = conn.getDB('resumedata');

const userData = [{  
  firstName: 'Francis',
  lastName: 'Williams',
  phoneNumber: process.env.PHONE_NUMBER,
  email: process.env.EMAIL,
  details:  
    [
      'I am a young professional with a passion for back-end applications, however, I love all kinds of software development.'
    ],
  skills: ['SQL', 'Java', 'Node.js', 'React.js', 'Kubernetes', 'Docker', 'C', 'C++', 'Rust', 'Spring']
}];


async function addResumeData() {
  try {
    db.createCollection('users');
    const result = await db.users.insertMany(userData);
    console.log(result)
    const userId = result.insertedIds[0];

    const experienceData = [
      { 
        userId: userId,
        name: 'Anaplan', 
        position: 'Associate Software Engineer', 
        details: [
          'Enhanced the developer experience within the Developer Enablement Group by creating and managing problem-solving tools. ' + 
          'Utilized a comprehensive tech stack including Java, Rust, Terraform, Cypress, Pact, and Kubernetes to empower developers ' + 
          'and streamline workflows.',
  
          'Boosted internal adoption of the team\'s Data Provisioning Tool (Java) through an impactful organization-wide demonstration, ' +
          'showcasing its value and capabilities to the greater organization.',
  
          'Significantly reduced errors in Splunk logs by 40% through the implementation of performance, ' +
          'stability, and contract (Pact) tests for the tool. Collaborated with internal users to gain insights, address concerns, ' + 
          'and align the tool with their specific needs. Expanded the associated Jenkins library, enabling seamless integration into ' + 
          'developers\' CI/CD pipelines, further enhancing its usability and effectiveness.',
  
          'Elevated the organization\'s test visibility by deploying a robust Rust-based web API on Amazon EKS and Aurora DB. ' +
          'Leveraged Infrastructure as Code (IaaC) principles to provision resources with Terraform and Helm. ' +
          'Demonstrated Agile principles by creating Jenkins pipelines for seamless containerization and integration of new code changes. ' + 
          'Implemented Harness pipelines for efficient deployment of those changes. ' + 
          'Introduced observability to the cluster with metrics and logging using OpenTelemetry and Grafana.',
  
          'Enhanced front-end for the application using React and Backstage by integrating our plugin into the organizations\' ' + 
          'existing backstage deployment.'
        ], 
        tags: ['Java', 'Rust', 'API', 'REST', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'Backend', 'Dev-Ops', 'Full-Stack', 'Jenkins'] 
      },
      { 
        userId: userId,
        name: 'HCLTech', 
        position: 'Intern Software Engineer', 
        details: [
          'Developed and managed full-stack website services encompassing front-end, back-end, and database layers using ' + 
          'Java, SpringBoot, OpenShift, and Angular.',
  
          'Ensured robust web security practices with code coverage over 90%, zero code smells, and minimal cognitive complexity.',
  
          'Successfully collaborated with a team of interns, effectively navigating a 12-hour time difference with managers. ' + 
          'Demonstrated exceptional coordination and communication skills to ensure seamless project development and progress.'
        ], 
        tags: ['Java', 'SpringBoot', 'API', 'REST', 'Backend', 'Full-Stack']
      }
    ];
  
    const projectData = [
      { 
        userId: userId,
        name: 'Method Payment Dashboard (Full Stack Site)', 
        link: 'https://github.com/JamaicaNater/Method-Payment-Dashboard', 
        details: [
          'Developed a user-friendly ReactJS-based interface enabling users to input payroll data, ' +
          'which is then parsed and securely stored in a database.',
    
          'Created a robust Rust-based web API that follows RESTful principles, ' +
          'facilitating seamless communication between the user interface and the database. '+ 
          'Implemented data validation and error handling to ensure data integrity and system reliability',
    
          'Employed modern containerization techniques using Docker, ' +
          'configuring dockerfiles and docker-compose files to enable hassle-free deployment and scalability across different environments. ' +
          'This ensured platform independence and streamlined application maintenance'
        ],
        tags: ['Rust', 'ReactJS', 'API', 'REST', 'Backend', 'Full-Stack', 'Frontend'] 
      },
      { 
        userId: userId,
        name: 'RocketManPSP (Video Game)', 
        link: 'https://github.com/JamaicaNater/RocketManPSP', 
        details: [
          'Spearheaded the development of a robust C++ game engine for the Sony PlayStation Portable (2005) from scratch, ' +
          'encompassing key features such as a graphic user interface, user input, image loading and rendering, ' + 
          'physics simulations, collision detection, and logging.',
    
          'Employed object-oriented design principles to architect game components, ' +
          'leveraging industry best practices to create an easily  maintainable codebase.',
    
          'Navigated the challenges of working within a limited 6MB RAM constraint (2MB stack, 4MB heap), ' + 
          'optimizing resource usage to maximize performance and deliver an immersive gaming experience on the Sony PSP platform.'
        ],
        tags: ['C++', 'Game-Development'] 
      },
      { 
        userId: userId,
        name: 'Micro-C Compiler', 
        link: 'https://git.sr.ht/~jamaicanater/McCompiler', 
        details: [
          'Designed a robust C-based compiler for Micro-C, which ensured strict adherence to the Micro-C grammar ' +
          'and generated efficient MIPS assembly code.',
    
          'Leveraged industry-standard lexical analyzer (lex) and powerful parser (yacc/bison) to analyze the code, ' +
          'transforming it into an abstract syntax tree.',
    
          'Demonstrated exceptional proficiency in advanced data structures and algorithms, ' +
          'utilizing trees to enable seamless compilation processes. Mastered recursion-based functions and operations ' + 
          'to enhance performance and code optimization.'
        ],
        tags: ['C', 'Compiler-Construction'] 
      },
      { 
        userId: userId,
        name: 'Red-To-You (Video Creation Tool)', 
        link: 'https://github.com/JamaicaNater/Red-To-You', 
        details: [
          'Developed a Python program that seamlessly converts Reddit post links into videos, ' +
          'incorporating customizable visual modifications to elevate the user\'s viewing experience.',
    
          'Leveraged advanced data analysis libraries such as sklearn and pandas to empower the tool with intelligent video length estimation. ' +
          'By analyzing the number of comments, replies, and characters in a thread, users can effortlessly specify the desired video duration.',
    
          'Optimized the tool\'s performance by implementing efficient multi-threading techniques, resulting in a substantial reduction in runtime. ' +
          'This enhancement ensures swift video generation, allowing users to enjoy their content without unnecessary delays.'
        ],
        tags: ['Python'] 
      }
    ];
    
    const educationData = [
      {
        userId: userId,
        name: "Texas State University",
        degreeType: "BS",
        major: "Computer Science",
        minor: "Mathermatics",
        gpa: 3.73,
        details: null,
        enrollmentDate: "2019-8",
        graduationDate: "2022-5",
        city: "San Marcos",
        state: "TX",
        country: "United States"
      }
    ];

    const referenceData = [
      {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "876-432-1234",
        email: "john.doe@gmail.com",
        relationship: "Manager"
      }
    ];

    db.createCollection('experiences');
    db.experiences.insertMany(experienceData);

    db.createCollection('educations');
    db.educations.insertMany(educationData);

    db.createCollection('projects');
    db.projects.insertMany(projectData);

    db.createCollection('references');
    db.references.insertMany(referenceData);

    print('MongoDB initialization script executed successfully.');
  } catch (error) {
    console.error(error);
  }
}

addResumeData();
