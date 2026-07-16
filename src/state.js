// State Management for Saved Properties

const STORAGE_KEY = 'realestate_clone_saved_properties';

// Get list of saved property IDs
export function getSavedPropertyIds() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading saved properties", e);
        return [];
    }
}

// Check if a specific property is saved
export function isPropertySaved(id) {
    const saved = getSavedPropertyIds();
    return saved.includes(Number(id));
}

// Toggle saved status of a property
export function toggleSaveProperty(id) {
    const numericId = Number(id);
    let saved = getSavedPropertyIds();
    
    if (saved.includes(numericId)) {
        saved = saved.filter(savedId => savedId !== numericId);
    } else {
        saved.push(numericId);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    
    // Dispatch a custom event to notify all components
    const event = new CustomEvent('savedPropertiesChanged', {
        detail: { savedIds: saved }
    });
    window.dispatchEvent(event);
    
    return saved.includes(numericId);
}

// Get count of saved properties
export function getSavedCount() {
    return getSavedPropertyIds().length;
}
