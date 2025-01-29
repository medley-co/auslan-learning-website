document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');
    const modeToggle = document.getElementById('mode-toggle');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    if (menu && menuLinks) {
        menu.addEventListener('click', function() {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });
    } else {
        console.error('Menu or menuLinks element not found.');
    }

    if (modeToggle && navbar) {
        modeToggle.addEventListener('click', () => {
            navbar.classList.toggle('dark-mode');
            navbar.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');
        });
    } else {
        console.error('ModeToggle or navbar element not found.');
    }

    // Array to store posts
    let posts = []

    // Function to display posts
    function displayPosts() {
        const postsContainer = document.getElementById('posts-container');
        if (!postsContainer) {
            return;
        }
        postsContainer.innerHTML = ''; // Clear previous posts

        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <p class="username-text">${post.username}</p>
                <p class="timestamp">${new Date(post.timestamp).toLocaleString()}</p>
                <p class="post-text">${post.content}</p>
                <div class="comments"></div>
                <input type="text" class="comment-input-username" placeholder="Your Username">
                <input type="text" class="comment-input" data-index="${index}" placeholder="Add a comment">
                <button class="comment-submit-btn" data-index="${index}">Submit</button>
            `;

            // Display comments
            const commentsContainer = postElement.querySelector('.comments');
            post.comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <p class="username-text">${comment.username}</p>
                    <p class="timestamp">${new Date(comment.timestamp).toLocaleString()}</p>
                    <p class="comment-text">${comment.content}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });

            // Add event listener for comment submission
            const commentSubmitBtn = postElement.querySelector('.comment-submit-btn');
            commentSubmitBtn.addEventListener('click', function() {
                const commentInputUsername = postElement.querySelector('.comment-input-username');
                const commentInputContent = postElement.querySelector('.comment-input');
                const username = commentInputUsername.value.trim() || 'Anonymous'; // Default to 'Anonymous' if no username is provided
                const content = commentInputContent.value.trim();

                if (content) {
                    // Create a new comment object
                    const timestamp = Date.now();
                    const newComment = { username, content, timestamp };

                    // Add the new comment to the post's comments array
                    posts[index].comments.push(newComment);

                    // Display the updated list of comments
                    displayPosts();

                    // Clear the comment input fields
                    commentInputUsername.value = '';
                    commentInputContent.value = '';
                } else {
                    // Display an error message or handle empty comment as needed
                    alert('Please enter a comment');
                }
            });

            postsContainer.appendChild(postElement);
        });
    }

    // Function to handle form submission
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get the username and post content from the input fields
            const username = document.getElementById('username').value.trim();
            const content = document.getElementById('post-content').value.trim();

            // Check if both fields are filled out
            if (username && content) {
                // Create a new post object
                const timestamp = Date.now();
                const newPost = {
                    username,
                    content,
                    timestamp,
                    comments: [] // Initialize an empty array for comments
                };

                // Add the new post to the posts array
                posts.push(newPost);

                // Display the updated list of posts
                displayPosts();

                // Clear the input fields
                document.getElementById('username').value = '';
                document.getElementById('post-content').value = '';
            } else {
                // Display an error message or handle empty fields as needed
                alert('Please fill out all fields');
            }
        });
    } 

    // Display existing posts when the page loads
    displayPosts();
});
