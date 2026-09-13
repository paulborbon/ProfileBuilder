
window.PB_DATA = {
  themes: {
    "Event": {
      types: {
        "Wedding": {
          scenes: ["Ceremony", "First Dance", "Reception", "Entrance", "Portrait", "Custom..."],
          defaults: {
            location: "Garden / Gazebo", timeOfDay: "Golden Hour", weather: "Clear / No value",
            lighting: "Warm cinematic", cameraMovement: "Smooth cinematic orbit",
            actionPace: "Slow", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Romantic", musicStyle: "Instrumental", tempo: "Slow",
            audioPriority: "Balanced", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Birthday": {
          scenes: ["Party", "Cake Moment", "Entrance", "Family Greeting", "Surprise", "Custom..."],
          defaults: {
            location: "Indoor Party Venue", timeOfDay: "Evening", weather: "No value",
            lighting: "Bright festive", cameraMovement: "Smooth handheld",
            actionPace: "Medium", cameraPace: "Medium", musicEnabled: "Yes",
            musicGenre: "Pop", musicStyle: "Upbeat", tempo: "Medium",
            audioPriority: "Music louder", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Anniversary": {
          scenes: ["Dinner", "Dance", "Memory Montage", "Renewal of Vows", "Custom..."],
          defaults: {
            location: "Elegant Ballroom", timeOfDay: "Evening", weather: "No value",
            lighting: "Warm romantic", cameraMovement: "Slow dolly",
            actionPace: "Slow", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Love Song", musicStyle: "Soft", tempo: "Slow",
            audioPriority: "Balanced", aspectRatio: "16:9", duration: "10 seconds"
          }
        }
      }
    },

    "Advertisement": {
      types: {
        "Product": {
          scenes: ["Product Hero Shot", "Usage Demo", "Lifestyle Shot", "Before and After", "Custom..."],
          defaults: {
            location: "Studio", timeOfDay: "No value", weather: "No value",
            lighting: "Clean commercial lighting", cameraMovement: "Product orbit",
            actionPace: "Medium", cameraPace: "Medium", musicEnabled: "Yes",
            musicGenre: "Corporate / Modern", musicStyle: "Clean", tempo: "Medium",
            audioPriority: "Voice louder", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Business": {
          scenes: ["Brand Introduction", "Office Scene", "Service Demonstration", "Customer Experience", "Custom..."],
          defaults: {
            location: "Modern Office", timeOfDay: "Day", weather: "Clear / No value",
            lighting: "Professional soft lighting", cameraMovement: "Slow push-in",
            actionPace: "Medium", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Corporate", musicStyle: "Modern", tempo: "Medium",
            audioPriority: "Voice louder", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Personal Brand": {
          scenes: ["Talking Head", "Lifestyle", "Workstation", "Behind the Scenes", "Custom..."],
          defaults: {
            location: "Modern Workspace", timeOfDay: "Day", weather: "No value",
            lighting: "Soft key light", cameraMovement: "Static / subtle movement",
            actionPace: "Slow", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Lo-fi", musicStyle: "Minimal", tempo: "Slow",
            audioPriority: "Voice louder", aspectRatio: "9:16", duration: "10 seconds"
          }
        }
      }
    },

    "Cinematic / Action": {
      types: {
        "Samurai": {
          scenes: ["Duel", "Katana Draw", "Temple Defense", "Village Battle", "Hero Entrance", "Custom..."],
          defaults: {
            location: "Traditional Japanese Temple", timeOfDay: "Night", weather: "Light Rain",
            lighting: "High-contrast cinematic", cameraMovement: "Fast cinematic tracking",
            actionPace: "Very Fast", cameraPace: "Fast", musicEnabled: "No",
            musicGenre: "No value", musicStyle: "No value", tempo: "No value",
            audioPriority: "Sound effects louder", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Sci-Fi": {
          scenes: ["Spaceship", "Cyberpunk Street", "Energy Battle", "Alien World", "Custom..."],
          defaults: {
            location: "Futuristic City", timeOfDay: "Night", weather: "Light Rain",
            lighting: "Neon cinematic", cameraMovement: "Dynamic tracking",
            actionPace: "Fast", cameraPace: "Fast", musicEnabled: "Yes",
            musicGenre: "Electronic", musicStyle: "Cinematic", tempo: "Fast",
            audioPriority: "Balanced", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Fantasy": {
          scenes: ["Castle", "Forest", "Magic Duel", "Dragon Encounter", "Custom..."],
          defaults: {
            location: "Ancient Castle", timeOfDay: "Sunset", weather: "Fog",
            lighting: "Epic cinematic", cameraMovement: "Slow sweeping crane",
            actionPace: "Medium", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Orchestral", musicStyle: "Epic", tempo: "Medium",
            audioPriority: "Music louder", aspectRatio: "16:9", duration: "10 seconds"
          }
        }
      }
    },

    "Story / Scene": {
      types: {
        "Romantic": {
          scenes: ["Meeting", "Dance", "Walk", "Dinner", "Proposal", "Custom..."],
          defaults: {
            location: "Scenic Outdoor Location", timeOfDay: "Golden Hour", weather: "Clear",
            lighting: "Warm soft cinematic", cameraMovement: "Slow dolly",
            actionPace: "Slow", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Romantic", musicStyle: "Instrumental", tempo: "Slow",
            audioPriority: "Balanced", aspectRatio: "16:9", duration: "10 seconds"
          }
        },
        "Family": {
          scenes: ["Reunion", "Celebration", "Portrait", "Home Moment", "Custom..."],
          defaults: {
            location: "Home / Garden", timeOfDay: "Day", weather: "Clear",
            lighting: "Natural soft light", cameraMovement: "Gentle handheld",
            actionPace: "Slow", cameraPace: "Slow", musicEnabled: "Yes",
            musicGenre: "Acoustic", musicStyle: "Warm", tempo: "Slow",
            audioPriority: "Balanced", aspectRatio: "16:9", duration: "10 seconds"
          }
        }
      }
    }
  },

  options: {
    platforms: ["Generic", "Kling AI", "Google Flow / Veo", "Runway", "Sora"],
    locations: [
      "Select an option", "No value", "Garden / Gazebo", "Church", "Beach", "Elegant Ballroom",
      "Indoor Party Venue", "Modern Office", "Modern Workspace", "Studio",
      "Traditional Japanese Temple", "Japanese Village", "Futuristic City", "Ancient Castle",
      "Scenic Outdoor Location", "Home / Garden", "Custom..."
    ],
    times: ["Select an option", "No value", "Dawn", "Morning", "Day", "Golden Hour", "Sunset", "Evening", "Night"],
    weather: ["Select an option", "No value", "Clear", "Clear / No value", "Cloudy", "Light Rain", "Heavy Rain", "Fog", "Snow", "Storm", "Windy"],
    lighting: [
      "Select an option", "No value", "Natural soft light", "Warm cinematic", "Warm romantic",
      "Bright festive", "Professional soft lighting", "Clean commercial lighting", "Soft key light",
      "High-contrast cinematic", "Neon cinematic", "Epic cinematic", "Warm soft cinematic", "Custom..."
    ],
    camera: [
      "Select an option", "No value", "Static", "Static / subtle movement", "Slow dolly", "Slow push-in",
      "Smooth cinematic orbit", "Smooth handheld", "Gentle handheld", "Product orbit",
      "Fast cinematic tracking", "Dynamic tracking", "Slow sweeping crane", "Custom..."
    ],
    pacing: ["Select an option", "No value", "Very Slow", "Slow", "Medium", "Fast", "Very Fast"],
    aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9", "5:2", "2:5"],
    durations: ["5 seconds", "6 seconds", "8 seconds", "10 seconds", "12 seconds", "15 seconds", "Custom..."],
    genres: ["Select an option", "No value", "Romantic", "Love Song", "Rock", "Pop", "K-Pop", "Corporate", "Corporate / Modern", "Lo-fi", "Electronic", "Orchestral", "Acoustic", "Cinematic", "Custom..."],
    musicStyles: ["Select an option", "No value", "Instrumental", "Soft", "Upbeat", "Clean", "Modern", "Minimal", "Cinematic", "Epic", "Warm", "Custom..."],
    tempos: ["Select an option", "No value", "Very Slow", "Slow", "Medium", "Fast", "Very Fast"],
    priorities: ["Balanced", "Voice louder", "Sound effects louder", "Music louder"],
    importance: ["Normal", "Important", "Critical"],
    dialogueLanguages: [
      "English", "Japanese (Romanized / Latin letters)", "Chinese Mandarin (Romanized / Pinyin without tone symbols)",
      "Korean (Romanized / Latin letters)", "Spanish (Latin letters)", "French (Latin letters)",
      "German (Latin letters)", "Italian (Latin letters)", "Filipino / Tagalog (Latin letters)", "Other / Custom"
    ]
  }
};
