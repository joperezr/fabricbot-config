// This task is only applicable if the area pod has specific areas specified
module.exports = ({podName, podAreas}) => (Array.isArray(podAreas) ? [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config": {
    "conditions": {
      "operator": "and",
      "operands": [
        {
          "operator": "not",
          "operands": [
            {
              "name": "isInProjectColumn",
              "parameters": {
                "projectName": `Area Pod: ${podName} - Issue Triage`,
                "columnName": "Triaged",
                "isOrgProject": true
              }
            }
          ]
        },
        {
          "operator": "and",
          "operands": podAreas.map(label => ({
            "operator": "not",
            "operands": [
              {
                "name": "hasLabel",
                "parameters": { label }
              }
            ]
          }))
        },
        {
          "name": "isAction",
          "parameters": {
            "action": "unlabeled"
          }
        }
      ]
    },
    "eventType": "issue",
    "eventNames": [
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${podName} - Issue Triage] Moved to Another Area`,
    "actions": [
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${podName} - Issue Triage`,
          "columnName": "Triaged",
          "isOrgProject": true
        }
      }
    ]
  }
}] : []);
