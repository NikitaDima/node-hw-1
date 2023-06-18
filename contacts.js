const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Повератємо масив об'єктів з файлу contacts.json
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
// Перебираємо масив об'єктів і знаходимо потрібний по id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(c => c.id === contactId);
  return contact || null;
}
// Видаляємо потрібний об'єкт за id
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(c => c.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}
// Додаємо новий об'єкт у наш масив об'єктів
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
