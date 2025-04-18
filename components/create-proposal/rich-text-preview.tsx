/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Heart, Sparkles, Type } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RichTextPreviewProps {
  content: string
  className?: string
  font?: string
  onFontChange?: (font: string) => void
}

const fonts = [
  // Professional & Clean Fonts
  { value: "font-inter", label: "Inter", description: "Modern & Crisp", category: "Professional", default: true },
  { value: "font-source-serif", label: "Source Serif Pro", description: "Professional & Polished", category: "Professional" },
  { value: "font-dm-sans", label: "DM Sans", description: "Clean & Contemporary", category: "Professional" },
  { value: "font-plus-jakarta", label: "Plus Jakarta Sans", description: "Elegant & Readable", category: "Professional" },
]

export function RichTextPreview({ 
  content, 
  className,
  font = "font-inter", // Default to Inter
  onFontChange 
}: RichTextPreviewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 -mx-12"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 p-3 sm:p-0">
        {onFontChange && (
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-rose-500" />
            <span className="text-sm text-gray-600">Choose Font Style</span>
          </div>
        )}
        {onFontChange && (
          <Select value={font} onValueChange={onFontChange}>
            <SelectTrigger className="w-[200px] text-sm sm:text-base p-2 sm:p-3">
              <SelectValue placeholder="Select Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Professional Fonts</SelectLabel>
                {fonts
                  .filter(f => f.category === "Professional")
                  .map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      <span className="block">{f.label}</span>
                      <span className="block text-xs text-muted-foreground">{f.description}</span>
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className={cn(
        "relative bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-rose-100/50",
        "text-gray-800 leading-relaxed tracking-wide",
        "max-w-4xl mx-auto",
        font,
        className
      )}>
        {/* Decorative hearts and sparkles */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-2 opacity-50">
          <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-rose-400 animate-pulse" />
          <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400 animate-spin" />
        </div>

        {/* Love letter style header */}
        <div className="text-center mb-4 sm:mb-6 border-b border-rose-200 pb-3 sm:pb-4">
          <h2 className={cn("text-2xl sm:text-3xl font-bold text-rose-600 tracking-wider", font)}>
            My Love Letter
          </h2>
          <p className="text-xs sm:text-sm text-rose-500">A heartfelt message just for you</p>
        </div>

        {/* Markdown Rendering */}
        <div className={cn("prose prose-rose lg:prose-lg max-w-none", font)}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 
                  className={cn("text-3xl font-bold text-gray-900 mb-4", font)}
                  {...props} 
                />
              ),
              h2: ({ node, ...props }) => (
                <h2 
                  className={cn("text-2xl font-bold text-gray-800 mb-3", font)}
                  {...props} 
                />
              ),
              p: ({ node, ...props }) => (
                <p 
                  className={cn("text-gray-700 leading-relaxed mb-4", font)}
                  {...props} 
                />
              ),
              strong: ({ node, ...props }) => (
                <strong 
                  className="font-bold text-rose-600" 
                  {...props} 
                />
              ),
              em: ({ node, ...props }) => (
                <em 
                  className="text-rose-500 font-medium" 
                  {...props} 
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote 
                  className="border-l-4 border-rose-200 pl-4 text-gray-600" 
                  {...props} 
                />
              ),
              ul: ({ node, ...props }) => (
                <ul 
                  className="list-disc list-inside space-y-2 text-gray-700" 
                  {...props} 
                />
              ),
              ol: ({ node, ...props }) => (
                <ol 
                  className="list-decimal list-inside space-y-2 text-gray-700" 
                  {...props} 
                />
              ),
              li: ({ node, ...props }) => (
                <li 
                  className="text-gray-700" 
                  {...props} 
                />
              ),
              a: ({ node, ...props }) => (
                <a 
                  className="text-rose-500 hover:text-rose-600 underline" 
                  {...props} 
                />
              ),
              hr: ({ node, ...props }) => (
                <hr 
                  className="my-8 border-t border-rose-100" 
                  {...props} 
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Romantic signature */}
        <div className="mt-6 pt-4 border-t border-rose-200 text-right">
          <p className={cn("text-rose-600 text-xl", font)}>
            Yours Lovingly
          </p>
        </div>
      </div>
    </motion.div>
  )
}
