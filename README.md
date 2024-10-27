# Ecommerce Assignment

This README provides instructions on how to run the Ecommerce Assignment project locally, along with an overview of the development approach and challenges faced during the project.

## Running the Project Locally

To get the project up and running on your local machine, follow these steps:

### Steps to Run the Project

1. **Clone the Repository:**

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/XiaoYhun/ecommerce-assignment.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd ecommerce-assignment
   ```

3. **Install Dependencies:**

   Install the necessary packages for both the client and server:

   ```bash
   npm install
   # or
   yarn
   ```

4. **Run the Application:**

   Run the application with the following command:

   ```bash
   npm dev
   ```

5. **Access the Application:**

   Open your web browser and go to `http://localhost:3000` to view the application.

## Development Approach

The development of this ecommerce platform focused on creating a React-based frontend with key features that enhance user experience. The approach included:

- Organized project folders and file naming conventions to facilitate future expansion and promote reusability.
- Implemented `React Query` to efficiently fetch and manage API calls, enhancing data synchronization and caching.
- Utilized `Context API` to share product filters seamlessly across components, ensuring consistent state management.
- Optimized route components by incorporating `lazy loading` and memoizing child components with `React.memo` to improve performance.
- Minimized unnecessary re-renders by leveraging `useCallback` and `useMemo`, leading to more efficient rendering processes.
- Designed a responsive user interface with `Tailwind CSS`, ensuring a smooth and consistent user experience across all devices.
- Developed a showcase page to effectively handle large data sets using `infinite scrolling` and `windowing` techniques.
