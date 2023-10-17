import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

/**
 * POST /books
 * @summary Post a new book
 * @tags books
 * @param {title, author, publishYear} request.body.required - book info
 * @return {book} 201 - Success response - application/json
 * @return {error} 500 - Bad request response
 */
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * GET /books
 * @summary Get all books
 * @tags books
 * @return {book} 200 - Success response - application/json
 * @return {error} 500 - Bad request response
 */
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * GET /books/:id
 * @summary Get a book by id
 * @tags books
 * @param {id} request.params.required - book id
 * @return {book} 200 - Success response - application/json
 * @return {error} 500 - Bad request response
 */
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * PUT /books/:id
 * @summary Update a book by id
 * @tags books
 * @param {title, author, publishYear} request.body.required - book info
 * @return {book} 200 - Success response - Book updated successfully
 * return {book} 400 - Send all required fields: title, author, publishYear
 * @return {error} 404 - Book not found
 * @return {error} 500 - Bad request response
 */
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * DELETE /books/:id
 * @summary Delete a book by id
 * @tags books
 * @param {id} request.params.required - book id
 * @return {book} 200 - Success response - Book deleted successfully
 * @return {error} 404 - Book not found
 * @return {error} 500 - Bad request response
 */
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;