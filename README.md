# Croisswapp

Croisswapp is a web application that allows users to convert code snippets from one format to another. It currently supports conversion between Jupyter Notebook ipynb files to Python files and JSX to JSON files. We are also planning to add support for HTML and JSX conversion in the future.

## Getting Started

To get started with Croisswapp, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running the following command in your terminal:

   ```
   npm install
   ```

3. Perform the Required Database migrations by running the following command:

   ```
   npx prisma db push
   ```

4. Set up your environment variables by creating a `.env` file and adding the required fields which can be found in the `.env.example` file (If you want you can just duplicate the `.env.example` file and rename it to `.env`).

5. Start the development server by running the following command:

   ```
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## How to Use Croisswapp

Using Croisswapp is simple:

1. Choose the format you want to convert from using the dropdown menu.
2. Paste your code snippet into the input area.
3. Click the "Convert" button.
4. Your converted code will appear in the output area.

You can also download your converted code as a file by clicking the "Download" button.

## Supported Formats

Currently, Croisswapp supports conversion between the following formats:

- Jupyter Notebook ipynb files to Python files
- JSX to JSON files

We are constantly working to add support for more formats, so stay tuned!

## Technologies Used

Croisswapp was built using the following technologies:

- Next.js
- Prisma
- Tailwind CSS
- Next-Auth

## Contributing

We welcome contributions from anyone who is interested in improving Croisswapp! To contribute, follow these steps:

1. Fork this repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to merge your changes into the main repository.

## Credits

Croisswapp was created by Ahmad Sandid
