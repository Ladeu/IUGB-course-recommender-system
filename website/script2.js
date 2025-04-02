async function getRecommendations() {
    const inputs = document.querySelectorAll('.course-input');
    
    // Collect, clean, and format course names (replace spaces with underscores)
    const takenCourses = Array.from(inputs)
      .map(input => input.value.trim().replace(/\s+/g, '_')) // Convert spaces to _
      .filter(course => course !== "");
  
    if (takenCourses.length === 0) {
      alert("Please enter at least one course!");
      return;
    }
  
    // Prepare the API endpoint URL
    const query = takenCourses.join(",");
    const apiUrl = `http://127.0.0.1:8000/recommend?courses=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      const recommendations = data.recommendations.flat();
  
      // Convert underscores back to spaces for display
      const displayCourses = recommendations.map(course => 
        course.replace(/_/g, ' ')
      );
      displayRecommendations(displayCourses);
  
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while fetching recommendations. Check console for details.");
    }
  }
  
  function displayRecommendations(courses) {
    const list = document.getElementById('recommendations-list');
    list.innerHTML = '';
  
    if (courses.length === 0) {
      list.innerHTML = '<li>No recommendations found. Try adding different courses!</li>';
      return;
    }
  
    courses.forEach(course => {
      const li = document.createElement('li');
      li.textContent = course;
      list.appendChild(li);
    });
  }
  
  function addInput() {
    const container = document.getElementById('course-inputs');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Enter a course name...';
    newInput.className = 'course-input';
    container.appendChild(newInput);
  }