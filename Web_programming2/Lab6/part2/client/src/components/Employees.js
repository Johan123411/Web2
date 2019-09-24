import React, { Component } from "react";
//Import Query from react-apollo
import { Query } from "react-apollo";

//Import the Modals for Adding and Updating Employee
import AddModal from "./modals/AddModal";
import EditEmployeeModal from "./modals/EditEmployeeModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";

//Import the file where my query constants are defined
import queries from "../queries";

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showAddModal: false,
      showDeleteModal: false,
      editEmployee: null,
      deleteEmployee: null
    };
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleCloseModals = this.handleCloseModals.bind(this);
  }
  handleOpenEditModal(quote) {
    this.setState({
      showEditModal: true,
      editEmployee: quote
    });
  }

  handleOpenDeleteModal(quote) {
    this.setState({
      showDeleteModal: true,
      deleteEmployee: quote
    });
  }
  handleCloseModals() {
    this.setState({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    });
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }
  render() {
    return (
        <div>
          <button className="button" onClick={this.handleOpenAddModal}>
            Create QUOTES
          </button>
          <br />
          <br />
          <Query query={queries.PULL_QUOTES}>
            {({ data }) => {
              const { quotes } = data;
              console.log({quotes});
              if (!quotes) {
                return null;
              }
              return (
                  <div>
                    {quotes.map(employee => {
                      return (
                          <div className="card" key={employee.id}>
                            <div className="card-body">
                              <h5 className="card-title">
                                {
                                  employee.quote
                                }
                              </h5>
                              <br />
                              <button
                                  className="button"
                                  onClick={() => {
                                    this.handleOpenEditModal(employee);
                                  }}
                              >
                                Edit
                              </button>
                              <button
                                  className="button"
                                  onClick={() => {
                                    this.handleOpenDeleteModal(employee);
                                  }}
                              >
                                Delete
                              </button>
                              <br />
                            </div>
                          </div>
                      );
                    })}
                  </div>
              );
            }}
          </Query>

          {/*Edit Employee Modal - NOT DONE YET */}
          {this.state && this.state.showEditModal && (
              <EditEmployeeModal
                  isOpen={this.state.showEditModal}
                  employee={this.state.editEmployee}
                  handleClose={this.handleCloseModals}
              />
          )}

          {/*Add Employee Modal */}
          {this.state && this.state.showAddModal && (
              <AddModal
                  isOpen={this.state.showAddModal}
                  handleClose={this.handleCloseModals}
                  modal="addEmployee"
              />
          )}

          {/*Delete Employee Modal */}
          {this.state && this.state.showDeleteModal && (
              <DeleteEmployeeModal
                  isOpen={this.state.showDeleteModal}
                  handleClose={this.handleCloseModals}
                  deleteEmployee={this.state.deleteEmployee}
              />
          )}
        </div>
    );
  }
}

export default Employees;
