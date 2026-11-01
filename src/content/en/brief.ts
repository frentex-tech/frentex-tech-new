import type { BriefContent } from "../brief";

const brief: BriefContent = {
  closeLabel: "Close",
  step: "Step 01 / Describe your needs",
  title: "Let's start with the right question.",
  note: "This summary stays on your device and is not sent anywhere.",
  serviceLabel: "What do you want to build?",
  services: ["A website or platform", "A mobile app", "An ERP or CRM system", "An integration or automation", "I need help choosing a solution"],
  challengeLabel: "What problem do you want to solve?",
  challengePlaceholder: "For example: customer requests are currently tracked across messages and spreadsheets...",
  usersLabel: "Who will use the solution?",
  usersPlaceholder: "For example: sales team, customers",
  submit: "Prepare summary",
  resultTitle: "Your summary is ready.",
  download: "Download summary",
  edit: "Edit",
  downloadStatus: "Your summary is downloading to your device. No data was sent.",
  fileName: "frentex-project-brief.txt",
  summary: ({ service, challenge, users }) =>
    `Project summary — Frentex Tech\n\nSolution type: ${service}\n\nThe problem:\n${challenge}\n\nUsers:\n${users}\n\nQuestions to discuss:\n- Which systems and data are available?\n- What is the first user journey we want to enable?\n- What are the acceptance criteria for the first release?\n- What are the scope, budget and target date?\n\nThis summary was prepared on your device. No data was sent and no meeting was booked.`,
};

export default brief;
