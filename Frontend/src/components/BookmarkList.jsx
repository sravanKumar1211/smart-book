import { useState } from 'react';

const BookmarkList = ({ bookmarks, onDelete, onUpdate }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editError, setEditError] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) {
      return;
    }

    setDeletingId(id);
    try {
      await onDelete(id);
    } catch (error) {
      alert('Failed to delete bookmark');
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (bookmark) => {
    setEditingId(bookmark._id);
    setEditUrl(bookmark.url);
    setEditTitle(bookmark.title);
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl('');
    setEditTitle('');
    setEditError('');
  };

  const handleUpdate = async (id) => {
    setEditError('');

    if (!editUrl.trim() || !editTitle.trim()) {
      setEditError('Please fill in both URL and title');
      return;
    }

    // Validate URL format
    try {
      new URL(editUrl);
    } catch {
      setEditError('Please enter a valid URL');
      return;
    }

    setUpdating(true);
    try {
      await onUpdate(id, editUrl.trim(), editTitle.trim());
      setEditingId(null);
      setEditUrl('');
      setEditTitle('');
    } catch (error) {
      setEditError(error.response?.data?.message || 'Failed to update bookmark');
    } finally {
      setUpdating(false);
    }
  };

  const openBookmark = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
        <svg
          className="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-gray-600">
          Start by adding your first bookmark above
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark._id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 p-5 flex flex-col"
        >
          {editingId === bookmark._id ? (
            <div className="flex-1">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                  placeholder="Bookmark title"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                  placeholder="https://example.com"
                />
              </div>
              {editError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs mb-3">
                  {editError}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(bookmark._id)}
                  disabled={updating}
                  className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {updating ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={updating}
                  className="flex-1 bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {bookmark.title}
                </h3>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openBookmark(bookmark.url);
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm break-all line-clamp-1"
                >
                  {bookmark.url}
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  Added {bookmark.createdAt ? new Date(bookmark.createdAt).toLocaleDateString() : ''}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openBookmark(bookmark.url)}
                  className="flex-1 bg-primary-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                >
                  Open
                </button>
                <button
                  onClick={() => startEdit(bookmark)}
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bookmark._id)}
                  disabled={deletingId === bookmark._id}
                  className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {deletingId === bookmark._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
