import React, { useState, useRef } from 'react';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Upload, 
  Search, 
  Grid3x3, 
  List, 
  X,
  File,
  ChevronRight,
  ChevronDown,
  Building2,
  Brain,
  BookOpen,
  GraduationCap,
  Heart,
  MessageCircle,
  Sparkles,
  Clock,
  FolderOpen,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect?: (file: FileItem) => void;
  theme: 'light' | 'dark';
  filterFolder?: string; // Optional: filter to specific folder (e.g., "Lessons")
}

export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'image' | 'video' | 'ai';
  size: string;
  date: string;
  category: string;
  uploadedBy: 'student' | 'admin' | 'ai';
  isInstitution?: boolean;
  tags?: string[];
}

interface FolderNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  children?: FolderNode[];
  expanded?: boolean;
}

export function FileSelectionModal({ isOpen, onClose, onFileSelect, theme, filterFolder }: FileSelectionModalProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(filterFolder ? 'inst-lessons' : 'my-learn');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['my-files', 'institution', 'ai-generated']);
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock file data for Learn Your Way
  const files: FileItem[] = [
    {
      id: 'lesson1',
      name: 'Introduction to Photosynthesis.pdf',
      type: 'pdf',
      size: '2.1 MB',
      date: '1 week ago',
      category: 'Lessons',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Biology', 'Science', 'Photosynthesis'],
    },
    {
      id: 'lesson2',
      name: 'Cell Structure and Function.pdf',
      type: 'pdf',
      size: '3.4 MB',
      date: '5 days ago',
      category: 'Lessons',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Biology', 'Cells', 'Science'],
    },
    {
      id: 'lesson3',
      name: 'Newton Laws of Motion.pdf',
      type: 'pdf',
      size: '1.9 MB',
      date: '3 days ago',
      category: 'Lessons',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Physics', 'Mechanics', 'Science'],
    },
    {
      id: 'lesson4',
      name: 'Chemical Bonding Basics.pdf',
      type: 'pdf',
      size: '2.8 MB',
      date: '2 days ago',
      category: 'Lessons',
      uploadedBy: 'admin',
      isInstitution: true,
      tags: ['Chemistry', 'Bonding', 'Science'],
    },
    {
      id: '5',
      name: 'Mind_Map_Biology.png',
      type: 'image',
      size: '3.8 MB',
      date: '1 week ago',
      category: 'Learn Your Way',
      uploadedBy: 'student',
      tags: ['Biology', 'Mind Map', 'Visual'],
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
    },
    {
      id: '1',
      name: 'Quantum Mechanics Notes.pdf',
      type: 'pdf',
      size: '2.4 MB',
      date: '2 hours ago',
      category: 'Notes',
      uploadedBy: 'student',
      tags: ['Physics', 'Quantum', 'Lecture'],
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
    },
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
    },
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
    },
    {
      id: '14',
      name: 'AI_Research_Summary_QM001.pdf',
      type: 'ai',
      size: '1.2 MB',
      date: '5 hours ago',
      category: 'AI Generated',
      uploadedBy: 'ai',
      tags: ['AI Summary', 'Research', 'Auto-generated'],
    },
  ];

  // Folder tree structure
  const folderTree: FolderNode[] = [
    {
      id: 'my-files',
      name: 'My Files',
      icon: <Folder className="w-4 h-4" />,
      children: [
        { id: 'my-notes', name: 'Notes', icon: <FileText className="w-4 h-4" /> },
        { id: 'my-research', name: 'Chapter Studio', icon: <Brain className="w-4 h-4" /> },
        { id: 'my-learn', name: 'Learn Your Way', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'my-exam', name: 'Exam Prep', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'my-uploads', name: 'Uploads', icon: <Upload className="w-4 h-4" /> },
      ],
    },
    {
      id: 'institution',
      name: 'Institution Files',
      icon: <Building2 className="w-4 h-4" />,
      children: [
        { id: 'inst-lessons', name: 'Lessons', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'inst-assignments', name: 'Assignments', icon: <FileText className="w-4 h-4" /> },
        { id: 'inst-questions', name: 'Question Papers', icon: <File className="w-4 h-4" /> },
        { id: 'inst-reference', name: 'Reference Materials', icon: <FolderOpen className="w-4 h-4" /> },
      ],
    },
    {
      id: 'ai-generated',
      name: 'AI Generated',
      icon: <Sparkles className="w-4 h-4" />,
      children: [
        { id: 'ai-research', name: 'Research IDs', icon: <Brain className="w-4 h-4" /> },
        { id: 'ai-sessions', name: 'Session Logs', icon: <Clock className="w-4 h-4" /> },
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
      'my-learn': 'Learn Your Way',
      'my-exam': 'Exam Prep',
      'my-uploads': 'Uploads',
      'inst-lessons': 'Lessons',
      'inst-assignments': 'Assignments',
      'inst-questions': 'Question Papers',
      'inst-reference': 'Reference Materials',
      'ai-research': 'Research IDs',
      'ai-sessions': 'Session Logs',
    };
    return categoryMap[folderId] || 'Uploads';
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      let fileType: 'pdf' | 'docx' | 'image' | 'video' | 'ai' = 'pdf';
      
      if (['pdf'].includes(extension)) fileType = 'pdf';
      else if (['doc', 'docx'].includes(extension)) fileType = 'docx';
      else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) fileType = 'image';
      else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) fileType = 'video';

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
      };

      return newFile;
    });

    setUploadedFiles([...newFiles, ...uploadedFiles]);
    
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

  // Folder to category mapping
  const folderCategoryMap: Record<string, string[]> = {
    'my-notes': ['Notes'],
    'my-research': ['Chapter Studio'],
    'my-learn': ['Learn Your Way'],
    'my-exam': ['Exam Prep'],
    'my-uploads': ['Uploads'],
    'inst-lessons': ['Lessons'],
    'inst-assignments': ['Assignments'],
    'inst-questions': ['Question Papers'],
    'inst-reference': ['Reference Materials'],
    'ai-research': ['Research IDs'],
    'ai-sessions': ['Session Logs', 'AI Generated'],
    'my-files': ['Notes', 'Chapter Studio', 'Learn Your Way', 'Exam Prep', 'Uploads'],
    'institution': ['Lessons', 'Assignments', 'Question Papers', 'Reference Materials'],
    'ai-generated': ['Research IDs', 'Session Logs', 'AI Generated'],
  };

  const allFiles = [...uploadedFiles, ...files];

  const filteredFiles = allFiles.filter(file => {
    const folderCategories = folderCategoryMap[selectedFolder];
    const matchesFolder = folderCategories ? folderCategories.includes(file.category) : true;
    
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
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
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

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <h2 className="text-white text-xl">{filterFolder === 'Lessons' ? 'Select Lesson' : 'Select File'}</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {filterFolder === 'Lessons' 
                    ? 'Choose a lesson PDF from SharePoint to begin learning' 
                    : 'Choose a file to use in Learn Your Way'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sidebar - Folder Tree (Hidden when filterFolder is set) */}
              {!filterFolder && (
                <div className="w-64 flex-shrink-0 bg-zinc-900 border-r border-zinc-800 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="text-sm text-white mb-4">Folders</h3>
                    <div className="space-y-1">{renderFolderTree(folderTree)}</div>
                  </div>
                </div>
              )}

              {/* Center - File Grid/List */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search Bar & Controls */}
                <div className="p-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search files, materials, or tags…"
                        className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 border focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* View Toggle */}
                    <div className="flex rounded-lg bg-zinc-800 border-zinc-700 border p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-zinc-700 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition-colors ${
                          viewMode === 'list'
                            ? 'bg-zinc-700 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
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

                    {/* Upload Button */}
                    <button
                      onClick={handleUploadClick}
                      className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </button>
                  </div>
                </div>

                {/* Files Display */}
                <div className="flex-1 overflow-y-auto p-4">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredFiles.map((file) => (
                        <motion.button
                          key={file.id}
                          onClick={() => handleFileClick(file)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            selectedFile?.id === file.id
                              ? 'bg-zinc-800 border-emerald-500 ring-2 ring-emerald-500/20'
                              : 'bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {getFileIcon(file.type)}
                            <div className="ml-auto flex items-center gap-1">
                              {file.date === 'Just now' && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                                  New
                                </span>
                              )}
                              {file.isInstitution && (
                                <Building2 className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <h4 className="text-sm mb-2 truncate text-white">
                            {file.name}
                          </h4>
                          <div className="text-xs space-y-1 text-zinc-500">
                            <div>{file.size}</div>
                            <div>{file.date}</div>
                            <div className="truncate">{file.category}</div>
                          </div>
                          {file.isInstitution && (
                            <div className="mt-2 text-xs px-2 py-1 rounded inline-block bg-blue-500/20 text-blue-400">
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
                          onClick={() => handleFileClick(file)}
                          whileHover={{ scale: 1.005 }}
                          whileTap={{ scale: 0.995 }}
                          className={`w-full p-4 rounded-xl border flex items-center gap-4 text-left transition-all ${
                            selectedFile?.id === file.id
                              ? 'bg-zinc-800 border-emerald-500 ring-2 ring-emerald-500/20'
                              : 'bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm mb-1 truncate text-white">
                              {file.name}
                            </h4>
                            <div className="text-xs text-zinc-500">
                              {file.category}
                            </div>
                          </div>
                          <div className="text-xs text-zinc-500">{file.size}</div>
                          <div className="text-xs flex items-center gap-2 text-zinc-500">
                            {file.date}
                            {file.date === 'Just now' && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
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
                      <Folder className="w-20 h-20 mb-4 text-zinc-700" />
                      <p className="text-lg mb-2 text-zinc-400">No content yet</p>
                      <p className="text-sm text-zinc-600">
                        {searchQuery ? 'Try adjusting your search' : 'Upload files to get started'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
