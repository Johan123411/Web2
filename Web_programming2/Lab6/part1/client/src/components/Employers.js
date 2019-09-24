import React, { Component } from "react";
//Import Query from react-apollo
import { Query } from "react-apollo";

//Import the Modals for Adding and Updating Employee
// import AddModal from "./modals/AddModal";

//Import the file where my query constants are defined
import queries from "../queries";

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class Employers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showAddModal: false
    };
    //this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    // this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    // this.handleCloseModals = this.handleCloseModals.bind(this);
  }

  // handleCloseModals() {
  //   this.setState({ showAddModal: false });
  // }
  //
  // handleOpenAddModal() {
  //   this.setState({ showAddModal: true });
  // }

  render() {
    return (
      <div>
        <br />
        <br />
        <Query
          query={queries.GET_USERS}
          fetchPolicy={"cache-and-network"}
        >
          {({ data }) => {
            const { users } = data;

            if (!users) {

              return null;
            }

            return (
              <div>
                {users.map(employer => {
                    return (
                    <div className="card" key={employer.id}>
                      <div className="card-body">
                        <h5 className="card-title">{employer.first_name} {employer.last_name}</h5>
                        <h5>Info:</h5>
                        <ol>
                          <li> ID: {employer.id} </li>
                          <li> First Name: {employer.first_name}</li>
                          <li> Last Name: {employer.last_name}</li>
                          <li> Email Id: {employer.email}</li>
                          <li> Gender: {employer.gender}</li>
                          <li> Department: {employer.department}</li>
                          <li> Country: {employer.country}</li>
                        </ol>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Query>

        {/*Add Employer Modal */}
        {/*{this.state && this.state.showAddModal && (*/}
        {/*  <AddModal*/}
        {/*    isOpen={this.state.showAddModal}*/}
        {/*    handleClose={this.handleCloseModals}*/}
        {/*    modal="addEmployer"*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    );
  }
}

export default Employers;
