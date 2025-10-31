import scanner from 'sonarqube-scanner';

scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.token': 'sqp_ac78d125c8bd2045411337275928be6fa5a8d062',
      'sonar.projectKey': 'ticketlab-app',
      'sonar.projectName': 'TicketLab App',
      'sonar.projectVersion': '1.0',

      'sonar.sources': 'src',
      'sonar.tests': 'test',
      'sonar.test.inclusions': '**/*.spec.ts',
      'sonar.exclusions': '**/node_modules/**,dist/**',

      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => process.exit(),
);
