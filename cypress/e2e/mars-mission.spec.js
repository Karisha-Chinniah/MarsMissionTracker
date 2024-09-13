describe('Mars Mission Task Tracker', () => {
    beforeEach(() => {
      // Visit your app
      cy.visit('http://localhost:8080');
    });
  
    it('displays the header correctly', () => {
      // Check if the header exists and contains the correct title
      cy.get('header').should('exist');
      cy.get('header').should('contain.text', 'Mars Mission Task Tracker');
    });
  
    it('allows creating a new task', () => {
      // Simulate adding a new task
      cy.get('input[name="task-title"]').type('Collect samples');
      cy.get('input[name="task-desc"]').type('Collect Martian soil samples.');
      cy.get('input[name="task-assigned"]').type('Astronaut 1');
      
      // Submit the form (assuming there's a form and a submit button)
      cy.get('button[type="submit"]').click();
      
      // Check if the task was added to the list
      cy.get('.task-list').should('contain.text', 'Collect samples');
    });
  
    it('allows deleting a task', () => {
      // Assuming tasks have delete buttons with a class "delete-btn"
      cy.get('.delete-btn').first().click();
      
      // Confirm the task has been removed from the list
      cy.get('.task-list').should('not.contain.text', 'Collect samples');
    });
  
    it('displays the number of tasks correctly', () => {
      // Check if the side panel shows the correct task count
      cy.get('.task-count').should('contain.text', '1 task(s)');
    });
  
    it('deletes all tasks when the clear button is clicked', () => {
      // Assuming there's a clear button to delete all tasks
      cy.get('.clear-tasks-btn').click();
      
      // Check if the task list is empty
      cy.get('.task-list').should('be.empty');
    });
  });
  