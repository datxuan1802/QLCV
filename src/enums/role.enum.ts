export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  TEAM_LEAD = 'Team_lead',
  MEMBER = 'MEMBER',
  VIEWER = 'Viewer',
}

//TODO: integrate later
export enum EPolicy {
  CREATE_WORKSPACE = 'create_workspace',
  READ_WORKSPACE = 'read_workspace',
  UPDATE_WORKSPACE = 'update_workspace',
  DELETE_WORKSPACE = 'delete_workspace',
}
// Sure, here are some suggested roles for a task management app along with their associated permissions:

// NOTE:
// Admin:
// Manage users: Create, edit, and delete user accounts.
// Manage roles: Create, edit, and delete roles.
// Access all projects and tasks.
// Modify any task or project.

// NOTE:
// Project Manager:
// Create and manage projects.
// Assign tasks to team members.
// Update tasks and projects.
// View tasks and projects assigned to their team members.

// NOTE:
// Team Member:
// View tasks and projects assigned to them.
// Update the status and details of their assigned tasks.
// Comment on tasks.
// Mark tasks as completed.

// NOTE:
// Viewer:
// View tasks and projects.
// Comment on tasks (without the ability to change task status).
// No editing or deletion permissions.

// NOTE:
// Guest:
// View tasks and projects.
// No ability to comment, edit, or perform any other actions.
