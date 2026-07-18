/* ============================================================================
   DECODED - ICONS
   ----------------------------------------------------------------------------
   Inline SVG icons from Iconoir (https://iconoir.com), MIT licensed.
   They are inlined so the game works fully offline. Each entry is the inner
   markup of an Iconoir 24x24 icon (stroke = currentColor, so they take on the
   surrounding text color).

   Use with DECODED.icon("name", { size: 20 }). Default size follows font size.
   To add an icon: grab its SVG from iconoir.com and paste the inner elements
   here under a new key.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var P = {
    star: '<path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "fire-flame": '<path d="M8 18C8 20.4148 9.79086 21 12 21C15.7587 21 17 18.5 14.5 13.5C11 18 10.5 11 11 9C9.5 12 8 14.8177 8 18Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21C17.0495 21 20 18.0956 20 13.125C20 8.15444 12 3 12 3C12 3 4 8.15444 4 13.125C4 18.0956 6.95054 21 12 21Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "check-circle": '<path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "xmark-circle": '<path d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    play: '<path d="M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    lock: '<path d="M16 12H17.4C17.7314 12 18 12.2686 18 12.6V19.4C18 19.7314 17.7314 20 17.4 20H6.6C6.26863 20 6 19.7314 6 19.4V12.6C6 12.2686 6.26863 12 6.6 12H8M16 12V8C16 6.66667 15.2 4 12 4C8.8 4 8 6.66667 8 8V12M16 12H8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    sparks: '<path d="M8 15C12.8747 15 15 12.949 15 8C15 12.949 17.1104 15 22 15C17.1104 15 15 17.1104 15 22C15 17.1104 12.8747 15 8 15Z" stroke="currentColor" stroke-linejoin="round"/><path d="M2 6.5C5.13376 6.5 6.5 5.18153 6.5 2C6.5 5.18153 7.85669 6.5 11 6.5C7.85669 6.5 6.5 7.85669 6.5 11C6.5 7.85669 5.13376 6.5 2 6.5Z" stroke="currentColor" stroke-linejoin="round"/>',

    trophy: '<path d="M6.74534 4H17.3132C17.3132 4 16.4326 17.2571 12.0293 17.2571C9.87826 17.2571 8.56786 14.0935 7.79011 10.8571C6.97574 7.46844 6.74534 4 6.74534 4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.3132 4C17.3132 4 18.2344 3.01733 19 2.99999C20.5 2.96603 20.7773 4 20.7773 4C21.0709 4.60953 21.3057 6.19429 19.8967 7.65715C18.4876 9.12 16.9103 10.4 16.2684 10.8571" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.74527 4.00001C6.74527 4.00001 5.78547 3.00614 4.99995 3.00001C3.49995 2.9883 3.22264 4.00001 3.22264 4.00001C2.92908 4.60953 2.69424 6.19429 4.1033 7.65715C5.51235 9.12001 7.14823 10.4 7.79004 10.8572" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.50662 20C8.50662 18.1714 12.0292 17.2571 12.0292 17.2571C12.0292 17.2571 15.5519 18.1714 15.5519 20H8.50662Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "light-bulb": '<path d="M9 18H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 21H14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.00082 15C9.00098 13 8.50098 12.5 7.50082 11.5C6.50067 10.5 6.02422 9.48689 6.00082 8C5.95284 4.95029 8.00067 3 12.0008 3C16.001 3 18.0488 4.95029 18.0008 8C17.9774 9.48689 17.5007 10.5 16.5008 11.5C15.501 12.5 15.001 13 15.0008 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    download: '<path d="M6 20L18 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "share-android": '<path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 6.5L8.5 10.5" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 13.5L15.5 17.5" stroke="currentColor" stroke-width="1.5"/>',

    mail: '<path d="M7 9L12 12.5L17 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="currentColor" stroke-width="1.5"/>',

    "half-moon": '<path d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "task-list": '<path d="M9 6L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.80002 5.79999L4.60002 6.59998L6.60001 4.59999" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.80002 11.8L4.60002 12.6L6.60001 10.6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.80002 17.8L4.60002 18.6L6.60001 16.6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12L20 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 18L20 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    brain: '<path d="M7 14C5.34315 14 4 15.3431 4 17C4 18.6569 5.34315 20 7 20C7.35064 20 7.68722 19.9398 8 19.8293" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.26392 15.6046C2.9243 14.9582 2.00004 13.587 2.00004 12C2.00004 10.7883 2.53877 9.70251 3.38978 8.96898" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.42053 8.8882C3.1549 8.49109 3 8.01363 3 7.5C3 6.11929 4.11929 5 5.5 5C6.06291 5 6.58237 5.18604 7.00024 5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.23769 5.56533C7.08524 5.24215 7 4.88103 7 4.5C7 3.11929 8.11929 2 9.5 2C10.8807 2 12 3.11929 12 4.5V20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 20C8 21.1046 8.89543 22 10 22C11.1046 22 12 21.1046 12 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7C12 8.65685 13.3431 10 15 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C16.6494 20 16.3128 19.9398 16 19.8293" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.7361 15.6046C21.0757 14.9582 22 13.587 22 12C22 10.7883 21.4612 9.70251 20.6102 8.96898" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.5795 8.8882C20.8451 8.49109 21 8.01363 21 7.5C21 6.11929 19.8807 5 18.5 5C17.9371 5 17.4176 5.18604 16.9998 5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4.5C12 3.11929 13.1193 2 14.5 2C15.8807 2 17 3.11929 17 4.5C17 4.88103 16.9148 5.24215 16.7623 5.56533" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 20C16 21.1046 15.1046 22 14 22C12.8954 22 12 21.1046 12 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "refresh-double": '<path d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "arrow-left": '<path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "sun-light": '<path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 12L23 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2V1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 23V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 20L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 4L19 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20L5 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 4L5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 12L2 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "nav-arrow-right": '<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    calculator: '<path d="M1 21V3C1 1.89543 1.89543 1 3 1H21C22.1046 1 23 1.89543 23 3V21C23 22.1046 22.1046 23 21 23H3C1.89543 23 1 22.1046 1 21Z" stroke="currentColor" stroke-width="1.5"/><path d="M15 7L17 7H19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 15.5H17L19 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 18.5H17H19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H7M9 7H7M7 7V5M7 7V9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.58609 18.4142L7.0003 17M8.41452 15.5858L7.0003 17M7.0003 17L5.58609 15.5858M7.0003 17L8.41452 18.4142" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "face-id": '<path d="M7 3H5C3.89543 3 3 3.89543 3 5V7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 3H19C20.1046 3 21 3.89543 21 5V7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8L16 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8L8 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 16C9 16 10 17 12 17C14 17 15 16 15 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8L12 13L11 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 21H19C20.1046 21 21 20.1046 21 19V17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    user: '<path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    search: '<path d="M17 17L21 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    list: '<path d="M8 6L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6.01L4.01 5.99889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12.01L4.01 11.9989" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 18.01L4.01 17.9989" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12L20 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 18L20 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    book: '<path d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143" stroke="currentColor" stroke-linecap="round"/><path d="M6 17L20 17" stroke="currentColor" stroke-linecap="round"/><path d="M6 21L20 21" stroke="currentColor" stroke-linecap="round"/><path d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7L15 7" stroke="currentColor" stroke-linecap="round"/>',

    community: '<path d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 18V17C1 15.3431 2.34315 14 4 14V14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 18V17C23 15.3431 21.6569 14 20 14V14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "chat-bubble": '<path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    leaf: '<path d="M7 21C7 21 7.5 16.5 11 12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    code: '<path d="M13.5 6L10 18.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 8.5L3 12L6.5 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 8.5L21 12L17.5 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "edit-pencil": '<path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    headset: '<path d="M4 13.4998L3.51493 13.6211C2.62459 13.8437 2 14.6437 2 15.5614V17.4383C2 18.356 2.62459 19.156 3.51493 19.3786L5.25448 19.8135C5.63317 19.9081 6 19.6217 6 19.2314V13.7683C6 13.378 5.63317 13.0916 5.25448 13.1862L4 13.4998ZM4 13.4998V13C4 8.02944 7.58172 4 12 4C16.4183 4 20 8.02944 20 13V13.5M20 13.5L20.4851 13.6211C21.3754 13.8437 22 14.6437 22 15.5614V17.4383C22 18.356 21.3754 19.156 20.4851 19.3786L18.7455 19.8135C18.3668 19.9081 18 19.6217 18 19.2314V13.7683C18 13.378 18.3668 13.0916 18.7455 13.1862L20 13.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    bell: '<path d="M18 8.4C18 6.70261 17.3679 5.07475 16.2426 3.87452C15.1174 2.67428 13.5913 2 12 2C10.4087 2 8.88258 2.67428 7.75736 3.87452C6.63214 5.07475 6 6.70261 6 8.4C6 15.8667 3 18 3 18H21C21 18 18 15.8667 18 8.4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    cloud: '<path d="M12 4C6 4 6 8 6 10C4.33333 10 1 11 1 15C1 19 4.33333 20 6 20H18C19.6667 20 23 19 23 15C23 11 19.6667 10 18 10C18 8 18 4 12 4Z" stroke="currentColor" stroke-linejoin="round"/>',

    prohibition: '<path d="M19.1414 5C17.3265 3.14864 14.7974 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19M19.1414 5C20.9097 6.80375 22 9.27455 22 12C22 17.5228 17.5228 22 12 22C9.20261 22 6.67349 20.8514 4.85857 19M19.1414 5L4.85857 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',

    "thumbs-up": '<path d="M16.4724 20H4.1C3.76863 20 3.5 19.7314 3.5 19.4V9.6C3.5 9.26863 3.76863 9 4.1 9H6.86762C7.57015 9 8.22116 8.6314 8.5826 8.02899L11.293 3.51161C11.8779 2.53688 13.2554 2.44422 13.9655 3.33186C14.3002 3.75025 14.4081 4.30635 14.2541 4.81956L13.2317 8.22759C13.1162 8.61256 13.4045 9 13.8064 9H18.3815C19.7002 9 20.658 10.254 20.311 11.5262L18.4019 18.5262C18.1646 19.3964 17.3743 20 16.4724 20Z" stroke="currentColor" stroke-linecap="round"/><path d="M7 20L7 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  /* Returns an inline SVG string for the named icon.
     opts.size: pixel size (default follows font size via 1em).
     opts.cls:  extra CSS classes. */
  DECODED.icon = function (name, opts) {
    opts = opts || {};
    var inner = P[name];
    if (!inner) inner = P["sparks"]; // graceful fallback
    var size = opts.size ? (opts.size + "") : "1em";
    var w = opts.size ? size : "1em";
    var cls = "ic" + (opts.cls ? " " + opts.cls : "");
    return '<svg class="' + cls + '" viewBox="0 0 24 24" width="' + w + '" height="' + w +
      '" fill="none" stroke-width="1.6" aria-hidden="true" focusable="false" ' +
      'xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  };

  // Expose the set of available icon names (handy for a future icon audit).
  DECODED.iconNames = Object.keys(P);
})();
