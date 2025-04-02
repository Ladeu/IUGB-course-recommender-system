async function getRecommendations() {
  const inputs = document.querySelectorAll('.course-input');
  
  // Collect and clean course names
  const takenCourses = Array.from(inputs)
    .map(input => input.value.trim())
    .filter(course => course !== "");

  if (takenCourses.length === 0) {
    alert("Please enter at least one course!");
    return;
  }

  // Prepare the API endpoint URL
  const query = takenCourses.join(",");
  const apiUrl = `  ${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const recommendations = data.recommendations.flat();

    displayRecommendations(recommendations);

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
