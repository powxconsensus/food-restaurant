import React from "react";
import MemberCard from "../../component/memberCard/memberCard.component";
import "./member.style.scss";
import { Helmet } from "react-helmet";

// member details for the memberCard to be displayed

class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [
        {
          name: "Priyanshu Mishra",
          rollNo: "S20190010145",
          title: "CEO & Co-Founder",
          image: "https://bit.ly/3qXRzrC",
          linkedin: "https://www.linkedin.com/in/jainendra-prakash-994b77197/",
          instagram: "https://www.instagram.com/",
        },
        {
          name: "Jainendra Prakash",
          rollNo: "S20190010068",
          title: "CTO & Co-Founder",
          image: "https://bit.ly/3qXRzrC",
          linkedin: "https://www.linkedin.com/in/jainendra-prakash-994b77197/",
          instagram: "https://www.instagram.com/",
        },
        {
          name: "Ashar Siddiui",
          rollNo: "S20190010012",
          title: "CFO & Co-Founder",
          image: "https://bit.ly/3qXRzrC",
          linkedin: "https://www.linkedin.com/in/jainendra-prakash-994b77197/",
          instagram: "https://www.instagram.com/",
        },

        {
          name: "Shreyas MS",
          rollNo: "S20190010161",
          title: "Project Manager & Co-Founder",
          image: "https://bit.ly/3qXRzrC",
          linkedin: "https://www.linkedin.com/in/jainendra-prakash-994b77197/",
          instagram: "https://www.instagram.com/",
        },
        {
          name: "Sumanth K",
          rollNo: "S20190010089",
          title: "Design Lead & Co-Founder",
          image: "https://bit.ly/3qXRzrC",
          linkedin: "https://www.linkedin.com/in/jainendra-prakash-994b77197/",
          instagram: "https://www.instagram.com/",
        },
      ],
    };
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{"Members"}</title>
        </Helmet>
        <div className="member-page">
          <div className="heading">
            <h3>Our Team Members</h3>
          </div>
          <div className="members">
            {this.state.user.map((user) => (
              <MemberCard {...user} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default Member;
