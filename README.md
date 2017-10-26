[Live Site](https://yoga-bloom.herokuapp.com/#)


# Intro

Welcome to Yoga Bloom! The purpose of this app is to catalog information about yoga asanas, or postures, and to give students and teachers the ability to build their own sequence of poses to practice and share with others. Searching the database is available to all visitors of the site, but you must register to be able to create a sequence. 

![3](https://www.dl.dropboxusercontent.com/s/b4pn6695cvcgovf/Screen%20Shot%202017-09-26%20at%2011.31.41%20PM.png?dl=0)

# Display Options

The nav bar at the top of the screen has a "Display Options" button that will show what information about the poses is currently being displayed. By default, only the english name, the sanskrit name, and the picture of the poses are displayed. By choosing an option within the Display Options menu, users can choose to display or withold additional information.  

![1](https://www.dl.dropboxusercontent.com/s/j9tfnf014vinx3y/Screen%20Shot%202017-09-26%20at%2011.34.11%20PM.png?dl=0)


# Creating an account

If you are new to the site click on the Register button located in the navigation bar. Create a username and password.

![5](https://www.dl.dropboxusercontent.com/s/8sbze35p6vo3xvm/Screen%20Shot%202017-09-26%20at%2011.28.59%20PM.png?dl=0)


If successful, you will see a new form open that will allow you to create your first sequence. Users are limited to one sequence per registered account. 

![4](https://www.dl.dropboxusercontent.com/s/1ohu8t1r4ia804e/Screen%20Shot%202017-09-26%20at%2011.30.32%20PM.png?dl=0) 


# Showing and editing user's sequences

In the navigation bar there is a button titled "Show Sequences." Clicking this option will display each registered user's sequence at the top of the page. Your sequence will also be displayed if you are logged in to your account. You may also edit the name and difficulty of your sequence, or delete it entirely and make a new one.

![2](https://www.dl.dropboxusercontent.com/s/fstie4c8q9kdru6/Screen%20Shot%202017-09-26%20at%2011.32.49%20PM.png?dl=0)

# Adding poses to a sequence

After logging in and creating a sequence you will see an orange button that says 'Add Pose' display in each of the pose listings. Clicking button this will add the selected pose to the end of your sequence. You can delete poses from your sequence by clicking on the red delete button underneath the pose picture within your sequence.

![6](https://www.dl.dropboxusercontent.com/s/b82wu2hi4yxp3up/Screen%20Shot%202017-09-27%20at%202.48.01%20AM.png?dl=0)

## Contributions

Yoga Bloom is made possible thanks to the yoga pose icons provided by Roundicons from roundicons.com.

I'm also grateful for dropbox's free image hosting.

Thanks to Thom Page, Matt Huntington, Karolin Rafalski, Kristyn Bryan, Cathleen Wright, and Todd Gerdy at General Assembly for leading a fantastic and educational web development course.

## Technologies Used

Angular, HTML, CSS, MongoDB, Javascript

## Bugs

User model does not update when a sequence is deleted from sequences route.

Users only able to create a single sequence because of how sequences are found using req.session.username. 

Deleting a duplicate pose from a sequence doesn't specify which duplicate to delete.

## Coming soon 

-Getting rid of duplicate images for poses
 
-Adding additional poses and pose pictures with different styling to grow the database

-Pose card sizing options

-Drag and drop sequence building

-Slideshow mode

-Making mobile version show only one column of poses



