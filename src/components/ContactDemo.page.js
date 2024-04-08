import { useState } from "react";
class Contact {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const ContactObjectDemo = () => {
  const [contact, setContact] = useState(new Contact("", ""));

  const handleFirstNameChange = (e) => {
    setContact({ ...contact, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setContact({ ...contact, lastName: e.target.value });
  };

  return (
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={contact.firstName}
        onChange={handleFirstNameChange}
      />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={contact.lastName}
        onChange={handleLastNameChange}
      />

      <section>
        <h4>Contact Object Details</h4>
        <p>First Name: {contact.firstName}</p>
        <p>Last Name: {contact.lastName}</p>
      </section>
    </div>
  );
};

class ContactXML {
  constructor(xmlString) {
    this.xmlString = xmlString;
  }

  get firstName() {
    // Parse the xmlString and extract the firstName value
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.xmlString, "text/xml");
    const firstNameNode = xmlDoc.getElementsByTagName("firstName")[0];
    return firstNameNode.textContent;
  }

  set firstName(value) {
    // Update the firstName value in the xmlString
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.xmlString, "text/xml");
    const firstNameNode = xmlDoc.getElementsByTagName("firstName")[0];
    firstNameNode.textContent = value;
    this.xmlString = new XMLSerializer().serializeToString(xmlDoc);
  }

  get lastName() {
    // Parse the xmlString and extract the lastName value
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.xmlString, "text/xml");
    const lastNameNode = xmlDoc.getElementsByTagName("lastName")[0];
    return lastNameNode.textContent;
  }

  set lastName(value) {
    // Update the lastName value in the xmlString
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.xmlString, "text/xml");
    const lastNameNode = xmlDoc.getElementsByTagName("lastName")[0];
    lastNameNode.textContent = value;
    this.xmlString = new XMLSerializer().serializeToString(xmlDoc);
  }
}

const ContactXMLDemo = () => {
  const [contactXML, setContactXML] = useState(
    "<contact><firstName></firstName><lastName></lastName></contact>"
  );

  const currentObject = new ContactXML(contactXML);

  const handleFirstNameChange = (e) => {
    currentObject.firstName = e.target.value;
    setContactXML(currentObject.xmlString);
  };

  const handleLastNameChange = (e) => {
    currentObject.lastName = e.target.value;
    setContactXML(currentObject.xmlString);
  };

  return (
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={currentObject.firstName}
        onChange={handleFirstNameChange}
      />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={currentObject.lastName}
        onChange={handleLastNameChange}
      />

      <section>
        <h4>Contact XML String:</h4>
        <p>{contactXML}</p>
      </section>
    </div>
  );
};

/*
const contactXMLString = "<contact><firstName>John</firstName><lastName>Doe</lastName></contact>";
const contactXML = new ContactXML(contactXMLString);
console.log(contactXML.firstName); // Output: John
console.log(contactXML.lastName); // Output: Doe

contactXML.firstName = "Jane";
contactXML.lastName = "Smith";
console.log(contactXML.firstName); // Output: Jane
console.log(contactXML.lastName); // Output: Smith
*/

export const ContactDemoPage = () => {
  return (
    <>
      <ContactObjectDemo />
      <ContactXMLDemo />
    </>
  );
};

/* Thoughts:
1. Case for XML - When we dont have to save in an external DB and we are interacting 
with GenAI using XML, we can use this approach. All the logic is in FE.
2. External DB saving - When the component needs to constantly interact with 
external DB, even then there is a case for XML representation. Save the object
as XML in the DB and then when needed, parse it in the FE, make XML changes and
mutate it.
3. If the XML document is large (ex: entire BlogArticle which has Notes and Content),
then we are doing large updates to the XML string. It will be hard to debug and might 
also have performence isseus. More importantly, we cannot support relational connections.
We will be have to deal with large XML documents
4. How to handle Relational connections in XML? - Just use keys. Ex: A key for a Task
Notes and Content will use that key as a reference. In the UI, mutate those records when
UI changes are made.
5. Complete Biz logic is in FE. Tests will be written for models. Components can be
built without a dependency on BE as all bizlogic is in FE. Mutations will save FE updates
to BE.

*/
