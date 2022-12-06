# E-Ispit Online Exam Web application

This document contains brief overview of application functionalities. 
*This is repository for frontend part of application only. Backend part is available here: https://github.com/ahmedmahovac/EIspitWebAppBackend*

**General implementation details:**
- Axios is used as HTTP client
- MongoDB is located in cloud (Atlas MongoDB)

## Registration

- Having an account is intented for teachers only
- Every registered user has teacher privileges
 <br /> 
 
- Formik and Yup are used for form validation

![Registracija](https://user-images.githubusercontent.com/73321593/205784240-5b2cf630-a10e-4b70-8c90-07d9a8d72aad.png)

## Login

- Previously registered user has a login option
<br /> 

- **JWT** is used for user authentification
- Formik and Yup are used for form validation


![prijavaFrontend](https://user-images.githubusercontent.com/73321593/205784066-5d2af3b3-1ecf-4e07-8371-db9230812e32.png)

## Creating an exam

- Setting up title, exam duration and exam questions
- Unlimited number of exam questions

![kreiranjeIspitaFrontend (1)](https://user-images.githubusercontent.com/73321593/205784889-29043066-5a93-45e9-8709-2b79af224311.png)

### Creating single exam question

- Three ways to describe question content: **text**, **images** and **pdf file** (can be combined)
- Zoom option for uploaded images
- Multifunctional pdf viewer for uploaded pdf file
<br /> 

- **Multer** library is used for storing images and pdfs
- Files are stored on backend server's disc, while relevant information about them is stored in cloud database

![kreiranjePitanjaFrontend (1)](https://user-images.githubusercontent.com/73321593/205785046-c5178e2f-d90b-4b6a-9b7d-50111f87699f.png)

![imagePdfView](https://user-images.githubusercontent.com/73321593/205786907-0c46e5d0-516a-4cc4-8520-e2d012dd468e.png)


## Viewing created exams

- Single exam's relevant information available
- Unique exam key as a way of distributing certain exam to students
- Searching by exam title
- Sorting by **created time** / **title** 
- **Open** / **Close** exam for students
- **Delete exam** / **Edit exam** / **Enter exam insight** options available
<br /> 

- No need to manually refresh list to apply changes to UI, it happens automatically

![pregledKreiranihISpita (1)](https://user-images.githubusercontent.com/73321593/205785412-62599cc6-e973-4ff7-99a4-42812a65f41e.png)

## Accessing exam as a student

![pristupIspitu](https://user-images.githubusercontent.com/73321593/205785675-0b56247f-1215-4460-a72e-66ad33742bb8.png)

### Viewing exam questions

![pregledPitanja (1)](https://user-images.githubusercontent.com/73321593/205786066-0a7ca212-cdd7-4dd7-93cd-02c64599009d.png)

### Taking pictures of answers by using mobile device

![uploadRjesenjaMobitel (1)](https://user-images.githubusercontent.com/73321593/205786251-4298a3a3-52ef-45f7-89e8-caca6a05ae9b.png)

## Review of students' exam takes

![examResults](https://user-images.githubusercontent.com/73321593/205787094-deb7f0bd-4181-4f7b-bf77-c64806f5a0ad.png)

### Leaving annotations on student's answer

![pregledRjesenja (1)](https://user-images.githubusercontent.com/73321593/205787605-38aa42b7-f94c-4ed8-8150-822d6085baa2.png)

## Exam insight

![pregledUvida (1)](https://user-images.githubusercontent.com/73321593/205787849-06d5bc47-9550-4935-b6fd-1adfd589a0ab.png)



