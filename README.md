# Crypt CLI
A tiny Command Line Interface to quickly set, get and delete data that need to be encrypted.

- « aes-256-cbc » is used for the cipher and decipher at the moment, gcm or ccm will be available soon
- « scrypt » is used for hashing keys
- SQLite stores it locally, you can easily sync it with another machine if you wish

No keys (password + salt hashed) are saved, which means that if you lost or forget your password, you cannot decipher the data 
you've saved there.


# Installation
### Usage with npm 
```bash
npm i -g crypto_cli_tool
```

From there you can call from your cli the application

```bash
ccli --set <string>
```

# Quickstart
Let say you want to save a password using the CLI;

```bash
ccli --set passForSomething
```

You will be prompter a password and a content, the content will be saved under the label(name) 
"passForSomething". The password will be derived using scrypt with a unique salt, the salt is 
unique to each track. The key cannot be retrieved without the password.


# API
### SET
```bash
ccli --set <string>
```
Command: "--set" or "-s"

The label will be the name under which your content will be retrieved for a later usage. You will be prompter the password 
with which the key will be derived from and the content that needs to be saved and encrypted.

### GET
```bash
ccli --get <string>
```
Command: "--get" or "-g"

You will be prompted a password and the content will be returned.

### DELETE
```bash
ccli --del <string>
```
Command: "--del" or "-d"

You will be prompted a password, and the content will be deleted from the SQLite database.

# Features & Incoming features
- [ ] Basic CRUD Operations
  - track
    - [x] create (set)
    - [x] read (get)
    - [ ] update (put)
    - [x] delete (del)
  - user
    - [x] create (set)
    - [x] read (get)
    - [x] update(put)
    - [x] delete
- [ ] Help command
- [ ] Output into a file, under a flag option
- [ ] Output into the clipboard, under a flag option
- [ ] Input path for file path instead of label (and file cipher/decipher) under a flag option
- [ ] Profile mode ("user", with pepper, output default preference, etc)
- [ ] « aes-256-gcm » support under profile preference
- [ ] Easy sync feature
