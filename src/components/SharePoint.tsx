import React, { useState, useRef } from 'react';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Download, 
  Upload, 
  Search, 
  Grid3x3, 
  List, 
  X,
  File,
  Clock,
  Tag,
  Share2,
  Trash2,
  Edit3,
  Move,
  ExternalLink,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Building2,
  Brain,
  BookOpen,
  GraduationCap,
  Heart,
  MessageCircle,
  FolderOpen,
  FileType,
  Eye,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SharePointProps {
  theme: 'light' | 'dark';
}

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'image' | 'video' | 'ai';
  size: string;
  date: string;
  category: string;
  uploadedBy: 'student' | 'admin' | 'ai';
  isInstitution?: boolean;
  tags?: string[];
  timeline?: TimelineEvent[];
}

interface TimelineEvent {
  action: string;
  timestamp: string;
}

interface FolderNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  children?: FolderNode[];
  expanded?: boolean;
}

export const SharePoint: React.FC<SharePointProps> = ({ theme }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('my-notes');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['my-files', 'institution', 'ai-generated']);
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [showNewFolderPopup, setShowNewFolderPopup] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderTree, setFolderTree] = useState<FolderNode[]>([
    {
      id: 'my-files',
      name: 'My Files',
      icon: <Folder className="w-4 h-4" />,
      children: [
        { id: 'my-notes', name: 'Notes', icon: <FileText className="w-4 h-4" /> },
      ],
    },
    {
      id: 'my-research',
      name: 'Chapter Studio',
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: 'admin-files',
      name: 'Admin Files',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'counseling-records',
      name: 'Counseling Records',
      icon: <MessageCircle className="w-4 h-4" />,
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newFolderPopupRef = useRef<HTMLDivElement>(null);
  const newFolderInputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcuts for new folder popup
  React.useEffect(() => {
    if (!showNewFolderPopup) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNewFolderPopup(false);
        setNewFolderName('');
      } else if (e.key === 'Enter' && newFolderName.trim()) {
        handleCreateFolder();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showNewFolderPopup, newFolderName]);

  // Auto-focus input when popup opens
  React.useEffect(() => {
    if (showNewFolderPopup && newFolderInputRef.current) {
      newFolderInputRef.current.focus();
    }
  }, [showNewFolderPopup]);

  // Handle creating new folder
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolderId = `folder-${Date.now()}`;
    const newFolder: FolderNode = {
      id: newFolderId,
      name: newFolderName.trim(),
      icon: <Folder className="w-4 h-4" />,
    };

    // Add to My Files children
    setFolderTree((prev) => 
      prev.map((node) => {
        if (node.id === 'my-files') {
          return {
            ...node,
            children: [...(node.children || []), newFolder],
          };
        }
        return node;
      })
    );

    // Update folder category map to include the new folder
    folderCategoryMap[newFolderId] = [newFolderName.trim()];

    // Expand My Files and select the new folder
    if (!expandedFolders.includes('my-files')) {
      setExpandedFolders([...expandedFolders, 'my-files']);
    }
    setSelectedFolder(newFolderId);
    
    // Clear file details panel
    setSelectedFile(null);
    
    // Reset and close popup
    setNewFolderName('');
    setShowNewFolderPopup(false);
  };

  // Mock file data
  const files: FileItem[] = [
    // Notes
    {
      id: '1',
      name: 'Quantum Mechanics Notes.pdf',
      type: 'pdf',
      size: '2.4 MB',
      date: '2 hours ago',
      category: 'Notes',
      uploadedBy: 'student',
      tags: ['Physics', 'Quantum', 'Lecture'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-28 09:00' },
        { action: 'Viewed', timestamp: '2024-11-28 10:30' },
        { action: 'Added to Exam Prep', timestamp: '2024-11-28 11:00' },
      ],
    },
    {
      id: '2',
      name: 'Calculus Chapter 5 Notes.pdf',
      type: 'pdf',
      size: '1.8 MB',
      date: '1 day ago',
      category: 'Notes',
      uploadedBy: 'student',
      tags: ['Math', 'Calculus', 'Chapter 5'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-27 14:00' },
        { action: 'Viewed', timestamp: '2024-11-27 15:30' },
      ],
    },
    {
      id: '3',
      name: 'Organic Chemistry Notes.docx',
      type: 'docx',
      size: '945 KB',
      date: '3 days ago',
      category: 'Notes',
      uploadedBy: 'student',
      tags: ['Chemistry', 'Organic', 'Notes'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-25 10:00' },
      ],
    },
    
    // Chapter Studio
    {
      id: '4',
      name: 'Research_Climate_Change.pdf',
      type: 'pdf',
      size: '5.2 MB',
      date: '5 days ago',
      category: 'Chapter Studio',
      uploadedBy: 'student',
      tags: ['Research', 'Climate', 'Environment'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-23 11:00' },
        { action: 'Added to Chapter Studio', timestamp: '2024-11-23 11:05' },
      ],
    },
    
    // Learn Your Way
    {
      id: '5',
      name: 'Mind_Map_Biology.png',
      type: 'image',
      size: '3.8 MB',
      date: '1 week ago',
      category: 'Learn Your Way',
      uploadedBy: 'student',
      tags: ['Biology', 'Mind Map', 'Visual'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-21 13:00' },
        { action: 'Added to Calendar', timestamp: '2024-11-21 13:15' },
      ],
    },
    {
      id: '6',
      name: 'Flashcards_History.pdf',
      type: 'pdf',
      size: '1.2 MB',
      date: '4 days ago',
      category: 'Learn Your Way',
      uploadedBy: 'student',
      tags: ['History', 'Flashcards', 'Study'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-24 09:00' },
      ],
    },
    
    // Exam Prep
    {
      id: '7',
      name: 'Physics_Mock_Test.pdf',
      type: 'pdf',
      size: '2.1 MB',
      date: '2 days ago',
      category: 'Exam Prep',
      uploadedBy: 'student',
      tags: ['Physics', 'Mock Test', 'Practice'],
      timeline: [
        { action: 'Created', timestamp: '2024-11-26 10:00' },
        { action: 'Completed', timestamp: '2024-11-26 12:30' },
      ],
    },
    
    // Assignments (Institution)
    {
      id: '8',
      name: 'Assignment_3_Calculus.docx',
      type: 'docx',
      size: '856 KB',
      date: '1 day ago',
      category: 'Assignments',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Math', 'Assignment', 'Due Soon'],
      timeline: [
        { action: 'Uploaded by Institution', timestamp: '2024-11-27 14:00' },
        { action: 'Downloaded', timestamp: '2024-11-27 15:30' },
      ],
    },
    {
      id: '9',
      name: 'Chemistry_Lab_Report_Template.docx',
      type: 'docx',
      size: '425 KB',
      date: '5 days ago',
      category: 'Assignments',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Chemistry', 'Lab', 'Template'],
      timeline: [
        { action: 'Uploaded by Institution', timestamp: '2024-11-23 09:00' },
        { action: 'Downloaded', timestamp: '2024-11-23 10:15' },
      ],
    },
    
    // Question Papers (Institution)
    {
      id: '10',
      name: 'Previous_Year_Questions_2023.pdf',
      type: 'pdf',
      size: '5.6 MB',
      date: '2 days ago',
      category: 'Question Papers',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Exam', 'Previous Year', 'Practice'],
      timeline: [
        { action: 'Uploaded by Institution', timestamp: '2024-11-26 09:00' },
        { action: 'Opened in Exam Prep', timestamp: '2024-11-26 10:30' },
      ],
    },
    {
      id: '11',
      name: 'Mid_Sem_Math_2024.pdf',
      type: 'pdf',
      size: '3.4 MB',
      date: '1 week ago',
      category: 'Question Papers',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Math', 'Mid Sem', '2024'],
      timeline: [
        { action: 'Uploaded by Institution', timestamp: '2024-11-21 08:00' },
      ],
    },
    
    // Reference Materials (Institution)
    {
      id: '12',
      name: 'Lab_Experiment_Demo.mp4',
      type: 'video',
      size: '45.2 MB',
      date: '3 days ago',
      category: 'Reference Materials',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Chemistry', 'Lab', 'Tutorial'],
      timeline: [
        { action: 'Shared by Institution', timestamp: '2024-11-25 10:00' },
        { action: 'Viewed', timestamp: '2024-11-25 16:30' },
      ],
    },
    {
      id: '13',
      name: 'Calculus_Reference_Book.pdf',
      type: 'pdf',
      size: '12.5 MB',
      date: '1 week ago',
      category: 'Reference Materials',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Math', 'Calculus', 'Reference'],
      timeline: [
        { action: 'Shared by Institution', timestamp: '2024-11-21 09:00' },
      ],
    },
    
    // AI Generated
    {
      id: '14',
      name: 'AI_Research_Summary_QM001.pdf',
      type: 'ai',
      size: '1.2 MB',
      date: '5 hours ago',
      category: 'AI Generated',
      uploadedBy: 'ai',
      tags: ['AI Summary', 'Research', 'Auto-generated'],
      timeline: [
        { action: 'Generated by AI', timestamp: '2024-11-28 08:00' },
        { action: 'Exported to PDF', timestamp: '2024-11-28 08:05' },
      ],
    },
    {
      id: '15',
      name: 'Session_Summary_Nov_27.pdf',
      type: 'ai',
      size: '890 KB',
      date: '1 day ago',
      category: 'AI Generated',
      uploadedBy: 'ai',
      tags: ['AI Summary', 'Session Log', 'Auto-generated'],
      timeline: [
        { action: 'Generated by AI', timestamp: '2024-11-27 18:00' },
      ],
    },
  ];

  const toggleFolder = (folderId: string) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter(id => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
    }
  };

  // Get category from current folder
  const getCategoryFromFolder = (folderId: string): string => {
    const categoryMap: Record<string, string> = {
      'my-notes': 'Notes',
      'my-research': 'Chapter Studio',
      'admin-files': 'Admin Files',
      'counseling-records': 'Counseling Records',
      'my-files': 'My Files',
    };
    
    // Check if it's a custom folder (dynamically created)
    if (categoryMap[folderId]) {
      return categoryMap[folderId];
    }
    
    // For custom folders, use the folder name from folderTree
    const findFolderName = (nodes: FolderNode[]): string | null => {
      for (const node of nodes) {
        if (node.id === folderId) return node.name;
        if (node.children) {
          const found = findFolderName(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const folderName = findFolderName(folderTree);
    return folderName || 'My Files';
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => {
      // Determine file type based on extension
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      let fileType: 'pdf' | 'docx' | 'image' | 'video' | 'ai' = 'pdf';
      
      if (['pdf'].includes(extension)) fileType = 'pdf';
      else if (['doc', 'docx'].includes(extension)) fileType = 'docx';
      else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) fileType = 'image';
      else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) fileType = 'video';

      // Format file size
      const formatSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
      };

      const newFile: FileItem = {
        id: `uploaded-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: fileType,
        size: formatSize(file.size),
        date: 'Just now',
        category: getCategoryFromFolder(selectedFolder),
        uploadedBy: 'student',
        tags: ['Uploaded'],
        timeline: [
          { action: 'Uploaded', timestamp: new Date().toLocaleString() },
        ],
      };

      return newFile;
    });

    setUploadedFiles([...newFiles, ...uploadedFiles]);
    
    // Auto-select the first uploaded file and show details
    if (newFiles.length > 0) {
      setSelectedFile(newFiles[0]);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-pink-500" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  // Check if current folder is editable (under My Files)
  const isEditableFolder = () => {
    // My Files and its children are editable
    if (selectedFolder === 'my-files' || selectedFolder === 'my-notes') {
      return true;
    }
    
    // Check if it's a custom folder under My Files
    const checkIfUnderMyFiles = (nodes: FolderNode[]): boolean => {
      for (const node of nodes) {
        if (node.id === 'my-files' && node.children) {
          const foundInChildren = node.children.some(child => child.id === selectedFolder);
          if (foundInChildren) return true;
        }
      }
      return false;
    };
    
    return checkIfUnderMyFiles(folderTree);
  };

  // Get allowed actions for a file based on its category
  const getFileActions = (file: FileItem) => {
    const category = file.category;
    
    // My Files and custom folders - all actions allowed
    if (category === 'Notes' || category === 'My Files' || 
        !['Chapter Studio', 'Admin Files', 'Counseling Records', 'Assignments', 
          'Question Papers', 'Reference Materials', 'AI Generated'].includes(category)) {
      return {
        download: true,
        rename: true,
        move: true,
        share: true,
        delete: true,
      };
    }
    
    // Chapter Studio - only download and share
    if (category === 'Chapter Studio') {
      return {
        download: true,
        rename: false,
        move: false,
        share: true,
        delete: false,
      };
    }
    
    // Admin Files (Assignments, Question Papers, Reference Materials, AI Generated) - only download and share
    if (['Admin Files', 'Assignments', 'Question Papers', 'Reference Materials', 'AI Generated'].includes(category)) {
      return {
        download: true,
        rename: false,
        move: false,
        share: true,
        delete: false,
      };
    }
    
    // Counseling Records - only download
    if (category === 'Counseling Records') {
      return {
        download: true,
        rename: false,
        move: false,
        share: false,
        delete: false,
      };
    }
    
    // Default fallback
    return {
      download: true,
      rename: false,
      move: false,
      share: false,
      delete: false,
    };
  };

  // Folder to category mapping
  const folderCategoryMap: Record<string, string[]> = {
    'my-notes': ['Notes'],
    'my-research': ['Chapter Studio'],
    'my-files': ['Notes'],
    'admin-files': ['Assignments', 'Question Papers', 'Reference Materials', 'Research IDs', 'Session Logs', 'AI Generated', 'Summaries'],
    'counseling-records': ['Counseling Records'],
  };

  // Combine uploaded files with mock files
  const allFiles = [...uploadedFiles, ...files];

  // Filter files based on selected folder and search query
  const filteredFiles = allFiles.filter(file => {
    // First filter by folder
    const folderCategories = folderCategoryMap[selectedFolder];
    const matchesFolder = folderCategories ? folderCategories.includes(file.category) : true;
    
    // Then filter by search query if exists
    const matchesSearch = searchQuery === '' || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFolder && matchesSearch;
  });

  const renderFolderTree = (nodes: FolderNode[], level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.includes(node.id);
      const isSelected = selectedFolder === node.id;
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.id}>
          <button
            onClick={() => {
              if (hasChildren) {
                toggleFolder(node.id);
              }
              setSelectedFolder(node.id);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              isSelected
                ? theme === 'dark'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-emerald-50 text-emerald-600'
                : theme === 'dark'
                ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            style={{ paddingLeft: `${12 + level * 16}px` }}
          >
            {hasChildren && (
              <span className="transition-transform duration-200">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </span>
            )}
            {!hasChildren && <span className="w-3" />}
            {node.icon}
            <span className="flex-1 text-left truncate">{node.name}</span>
          </button>
          {hasChildren && isExpanded && (
            <div className="mt-1">
              {renderFolderTree(node.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Panel 1: Left Sidebar - Folder Tree */}
      <div
        className={`w-64 flex-shrink-0 ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
        } border-r overflow-y-auto`}
      >
        <div className="p-4">
          <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Folders
          </h3>
          <div className="space-y-1">{renderFolderTree(folderTree)}</div>
        </div>

        {/* Trash Info */}
        <div className={`p-4 m-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
            <Trash2 className="w-3 h-3 inline mr-1" />
            Auto-delete in 30 days
          </p>
        </div>
      </div>

      {/* Panel 2: Center - File Grid/List */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Bar & Controls */}
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files, materials, or tags…"
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
            </div>

            {/* View Toggle */}
            <div
              className={`flex rounded-lg ${
                theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'
              } border p-1`}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? theme === 'dark'
                      ? 'bg-zinc-700 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                    : theme === 'dark'
                    ? 'text-zinc-500 hover:text-zinc-300'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? theme === 'dark'
                      ? 'bg-zinc-700 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                    : theme === 'dark'
                    ? 'text-zinc-500 hover:text-zinc-300'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.svg,.mp4,.avi,.mov,.wmv"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* New Folder Button - Only visible in My Files */}
            {(selectedFolder === 'my-files' || selectedFolder === 'my-notes') && (
              <button
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors border ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setShowNewFolderPopup(true)}
              >
                <Plus className="w-4 h-4" />
                New Folder
              </button>
            )}

            {/* Upload Button - Only visible in editable folders (My Files and its children) */}
            {isEditableFolder() && (
              <button
                onClick={handleUploadClick}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  theme === 'dark'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
            )}
          </div>
        </div>

        {/* Files Display */}
        <div className="flex-1 overflow-y-auto p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <motion.button
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedFile?.id === file.id
                      ? theme === 'dark'
                        ? 'bg-zinc-800 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : theme === 'dark'
                      ? 'bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {getFileIcon(file.type)}
                    <div className="ml-auto flex items-center gap-1">
                      {file.date === 'Just now' && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          New
                        </span>
                      )}
                      {file.isInstitution && (
                        <Building2 className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                  <h4
                    className={`text-sm mb-2 truncate ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {file.name}
                  </h4>
                  <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    <div>{file.size}</div>
                    <div>{file.date}</div>
                    <div className="truncate">{file.category}</div>
                  </div>
                  {file.isInstitution && (
                    <div
                      className={`mt-2 text-xs px-2 py-1 rounded inline-block ${
                        theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      Institution
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <motion.button
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className={`w-full p-4 rounded-xl border flex items-center gap-4 text-left transition-all ${
                    selectedFile?.id === file.id
                      ? theme === 'dark'
                        ? 'bg-zinc-800 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : theme === 'dark'
                      ? 'bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm mb-1 truncate ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {file.name}
                    </h4>
                    <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      {file.category}
                    </div>
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    {file.size}
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    {file.date}
                    {file.date === 'Just now' && (
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        New
                      </span>
                    )}
                  </div>
                  {file.isInstitution && <Building2 className="w-4 h-4 text-blue-500" />}
                </motion.button>
              ))}
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <Folder
                className={`w-20 h-20 mb-4 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-300'}`}
              />
              <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                No content yet
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                {searchQuery ? 'Try adjusting your search' : 'Upload files to get started'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Panel 3: Right Slide Panel - File Details */}
      <AnimatePresence>
        {selectedFile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFile(null)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Details Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed right-0 top-0 h-full w-full md:w-96 ${
                theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
              } shadow-2xl z-50 overflow-y-auto`}
            >
              {/* Header */}
              <div
                className={`sticky top-0 ${
                  theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                } border-b p-4 flex items-center justify-between z-10`}
              >
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  File Details
                </h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* File Preview */}
                <div
                  className={`rounded-xl p-8 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                  }`}
                >
                  {getFileIcon(selectedFile.type)}
                </div>

                {/* File Name */}
                <div>
                  <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFile.name}
                  </h4>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    {selectedFile.category}
                  </p>
                </div>

                {/* Metadata Section */}
                <div
                  className={`rounded-xl p-4 ${
                    theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'
                  } border`}
                >
                  <h5
                    className={`text-xs font-medium mb-3 ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}
                  >
                    METADATA
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Type</span>
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        {selectedFile.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Size</span>
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        {selectedFile.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Created</span>
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        {selectedFile.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Uploaded By</span>
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        {selectedFile.uploadedBy === 'admin' ? 'Institution' : selectedFile.uploadedBy === 'ai' ? 'AI' : 'You'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Smart Tags */}
                {selectedFile.tags && selectedFile.tags.length > 0 && (
                  <div
                    className={`rounded-xl p-4 ${
                      theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'
                    } border`}
                  >
                    <h5
                      className={`text-xs font-medium mb-3 flex items-center gap-2 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      SMART TAGS
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFile.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-lg text-xs ${
                            theme === 'dark'
                              ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                              : 'bg-white border-gray-300 text-gray-600'
                          } border`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    className={`w-full px-4 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {getFileActions(selectedFile).rename && (
                      <button
                        className={`px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } border`}
                      >
                        <Edit3 className="w-3 h-3" />
                        Rename
                      </button>
                    )}
                    {getFileActions(selectedFile).move && (
                      <button
                        className={`px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } border`}
                      >
                        <Move className="w-3 h-3" />
                        Move
                      </button>
                    )}
                    {getFileActions(selectedFile).share && (
                      <button
                        className={`px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } border`}
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                    )}
                    {getFileActions(selectedFile).delete && (
                      <button
                        className={`px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-red-400 hover:bg-zinc-700'
                            : 'bg-white border-gray-300 text-red-600 hover:bg-gray-50'
                        } border`}
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div
                  className={`rounded-xl p-4 ${
                    theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'
                  } border`}
                >
                  <h5
                    className={`text-xs font-medium mb-3 ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}
                  >
                    QUICK ACTIONS
                  </h5>
                  <div className="space-y-2 text-xs">
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <Brain className="w-3 h-3" />
                      Open in Chapter Studio
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      Open in Learn Your Way
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <GraduationCap className="w-3 h-3" />
                      Add to Exam Prep
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      Add to Calendar
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate Summary
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Find Related Files
                    </button>
                  </div>
                </div>

                {/* Timeline Activity */}
                {selectedFile.timeline && selectedFile.timeline.length > 0 && (
                  <div
                    className={`rounded-xl p-4 ${
                      theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'
                    } border`}
                  >
                    <h5
                      className={`text-xs font-medium mb-3 flex items-center gap-2 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      TIMELINE ACTIVITY
                    </h5>
                    <div className="space-y-3">
                      {selectedFile.timeline.map((event, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                              theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-600'
                            }`}
                          />
                          <div className="flex-1">
                            <p
                              className={`text-xs ${
                                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                              }`}
                            >
                              {event.action}
                            </p>
                            <p
                              className={`text-xs mt-0.5 ${
                                theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'
                              }`}
                            >
                              {event.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New Folder Popup */}
      {showNewFolderPopup && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() => {
            setShowNewFolderPopup(false);
            setNewFolderName('');
          }}
        >
          <div
            className={`p-6 rounded-xl shadow-xl w-96 ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create New Folder
            </h4>
            <input
              ref={newFolderInputRef}
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name…"
              className={`w-full px-4 py-2 rounded-lg text-sm mb-4 ${
                theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
            <div className="flex justify-end gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setShowNewFolderPopup(false);
                  setNewFolderName('');
                }}
              >
                Cancel
              </button>
              <button
                disabled={!newFolderName.trim()}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  newFolderName.trim()
                    ? theme === 'dark'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={handleCreateFolder}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};