import { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkList from './BookmarkList';
import AddBookmark from './AddBookmark';

const Dashboard = ({ user, onLogout }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('/api/bookmarks');
      if (response.data.success) {
        setBookmarks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBookmark = async (url, title) => {
    try {
      const response = await axios.post('/api/bookmarks', { url, title });
      if (response.data.success) {
        // Refetch bookmarks to update the list
        await fetchBookmarks();
        return true;
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      const response = await axios.delete(`/api/bookmarks/${id}`);
      if (response.data.success) {
        // Refetch bookmarks to update the list
        await fetchBookmarks();
        return true;
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      throw error;
    }
  };

  const handleUpdateBookmark = async (id, url, title) => {
    try {
      const response = await axios.put(`/api/bookmarks/${id}`, { url, title });
      if (response.data.success) {
        // Refetch bookmarks to update the list
        await fetchBookmarks();
        return true;
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-primary-500"
                />
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Welcome, {user.name}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            My Bookmarks
          </h2>
          <p className="text-gray-600">
            Save and organize your favorite links
          </p>
        </div>

        {/* Add Bookmark Form */}
        <AddBookmark onAdd={handleAddBookmark} />

        {/* Bookmarks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookmarks...</p>
          </div>
        ) : (
          <BookmarkList
            bookmarks={bookmarks}
            onDelete={handleDeleteBookmark}
            onUpdate={handleUpdateBookmark}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
