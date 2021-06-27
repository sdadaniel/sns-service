$(function () {
    init_tree()
    
})

function init_tree() {
    $.ajax({
        url: "/adm/api/category/getlist",
        type: "GET",
        dataType: "json"
    }).done((data) => {
        var LAST_EFFECT_DO = null,
            LAST_EFFECT_DD = null,
            lazyLogCache = {};
        $("#tree").fancytree({
            imagePath: "/module/fancytree/src/skin-custom-1/custom-icons.gif",
            extensions: ["dnd5", "edit"],
            treeId: "1",
            init: function (event, data) {},
            edit: {
                triggerStart: ["clickActive", "dblclick", "f2", "mac+enter", "shift+click"],
                beforeEdit: function (event, data) {
                    // Return false to prevent edit mode
                },
                edit: function (event, data) {
                    // Editor was opened (available as data.input)
                },
                beforeClose: function (event, data) {
                    // Return false to prevent cancel/save (data.input is available)
                    console.log(event.type, event, data);
                    if (data.originalEvent.type === "mousedown") {
                        // We could prevent the mouse click from generating a blur event
                        // (which would then again close the editor) and return `false` to keep
                        // the editor open:
                        //                  data.originalEvent.preventDefault();
                        //                  return false;
                        // Or go on with closing the editor, but discard any changes:
                        //                  data.save = false;
                    }
                },
                save: function (event, data) {
                    // Save data.input.val() or return false to keep editor open
                    console.log("save...", this, data);
                    // Simulate to start a slow ajax request...
                    setTimeout(function () {
                        $(data.node.span).removeClass("pending");
                        // Let's pretend the server returned a slightly modified
                        // title:
                        $(data.node.span).css("color", "red");
                        //data.node.setTitle(data.node.title + "!");
                    }, 2000);
                    // We return true, so ext-edit will set the current user input
                    // as title
                    return true;
                },

                close: function (event, data) {
                    // Editor was removed
                    if (data.save) {
                        // Since we started an async request, mark the node as preliminary
                        $(data.node.span).addClass("pending");
                    }
                }
            },

            source: data,
            dnd5: {
                //autoExpandMS: 400,
                // preventForeignNodes: true,
                // preventNonNodes: true,
                preventRecursion: true, // Prevent dropping nodes on own descendants
                // preventSameParent: true,
                preventVoidMoves: true, // Prevent moving nodes 'before self', etc.
                // effectAllowed: "all",
                // dropEffectDefault: "move", // "auto",

                // --- Drag-support:

                dragStart: function (node, data) {
                    /* This function MUST be defined to enable dragging for the tree.
                     *
                     * Return false to cancel dragging of node.
                     * data.dataTransfer.setData() and .setDragImage() is available
                     * here.
                     */
                    node.debug("T1: dragStart: " + "data: " + data.dropEffect + "/" + data.effectAllowed +
                        ", dataTransfer: " + data.dataTransfer.dropEffect + "/" + data.dataTransfer.effectAllowed, data);

                    // Set the allowed effects (i.e. override the 'effectAllowed' option)
                    data.effectAllowed = "all";

                    // Set a drop effect (i.e. override the 'dropEffectDefault' option)
                    // data.dropEffect = "link";
                    //data.dropEffect = "copy";
                    data.dropEffect = data.dropEffectSuggested;

                    // We could use a custom image here:
                    // data.dataTransfer.setDragImage($("<div>TEST</div>").appendTo("body")[0], -10, -10);
                    // data.useDefaultImage = false;

                    // Return true to allow the drag operation
                    return true;
                },
                // dragDrag: function(node, data) {
                //   logLazy("dragDrag", null, 2000,
                //     "T1: dragDrag: " + "data: " + data.dropEffect + "/" + data.effectAllowed +
                //     ", dataTransfer: " + data.dataTransfer.dropEffect + "/" + data.dataTransfer.effectAllowed );
                // },
                // dragEnd: function(node, data) {
                //   node.debug( "T1: dragEnd: " + "data: " + data.dropEffect + "/" + data.effectAllowed +
                //     ", dataTransfer: " + data.dataTransfer.dropEffect + "/" + data.dataTransfer.effectAllowed, data);
                //     alert("T1: dragEnd")
                // },

                // --- Drop-support:

                dragEnter: function (node, data) {
                    node.debug("T1: dragEnter: " + "data: " + data.dropEffect + "/" + data.effectAllowed +
                        ", dataTransfer: " + data.dataTransfer.dropEffect + "/" + data.dataTransfer.effectAllowed, data);

                    // data.dropEffect = "copy";
                    return true;
                },
                dragOver: function (node, data) {
                    logLazy("dragOver", null, 2000,
                        "T1: dragOver: " + "data: " + data.dropEffect + "/" + data.effectAllowed +
                        ", dataTransfer: " + data.dataTransfer.dropEffect + "/" + data.dataTransfer.effectAllowed);

                    // Assume typical mapping for modifier keys
                    data.dropEffect = data.dropEffectSuggested;
                    // data.dropEffect = "move";
                },
                dragDrop: function (node, data) {
                    /* This function MUST be defined to enable dropping of items on
                     * the tree.
                     */
                    var newNode,
                        transfer = data.dataTransfer,
                        sourceNodes = data.otherNodeList,
                        mode = data.dropEffect;

                    node.debug("T1: dragDrop: effect=" + "data: " + data.dropEffect + "/" + data.effectAllowed +
                        ", dataTransfer: " + transfer.dropEffect + "/" + transfer.effectAllowed, data);

                    alert("Drop on " + node + ":\n" +
                        "source:" + JSON.stringify(data.otherNodeData) + "\n" +
                        "hitMode:" + data.hitMode +
                        ", dropEffect:" + data.dropEffect +
                        ", effectAllowed:" + data.effectAllowed);

                    if (data.hitMode === "after") {
                        // If node are inserted directly after tagrget node one-by-one,
                        // this would reverse them. So we compensate:
                        sourceNodes.reverse();
                    }
                    if (data.otherNode) {
                        // Drop another Fancytree node from same frame (maybe a different tree however)
                        var sameTree = (data.otherNode.tree === data.tree);

                        if (mode === "move") {
                            data.otherNode.moveTo(node, data.hitMode);
                        } else {
                            newNode = data.otherNode.copyTo(node, data.hitMode);
                            if (mode === "link") {
                                newNode.setTitle("Link to " + newNode.title);
                            } else {
                                newNode.setTitle("Copy of " + newNode.title);
                            }
                        }
                    } else if (data.otherNodeData) {
                        // Drop Fancytree node from different frame or window, so we only have
                        // JSON representation available
                        node.addChild(data.otherNodeData, data.hitMode);
                    } else if (data.files.length) {
                        // Drop files
                        for (var i = 0; i < data.files.length; i++) {
                            var file = data.files[i];
                            node.addNode({
                                title: "'" + file.name + "' (" + file.size + " bytes)"
                            }, data.hitMode);
                            // var url = "'https://example.com/upload",
                            //     formData = new FormData();

                            // formData.append("file", transfer.files[0])
                            // fetch(url, {
                            //   method: "POST",
                            //   body: formData
                            // }).then(function() { /* Done. Inform the user */ })
                            // .catch(function() { /* Error. Inform the user */ });
                        }
                    } else {
                        // Drop a non-node
                        node.addNode({
                            title: transfer.getData("text")
                        }, data.hitMode);
                    }
                    node.setExpanded();
                },
            },
        });

        function logLazy(name, value, interval, msg) {
            if (!lazyLogCache[name]) {
                lazyLogCache[name] = {
                    stamp: now
                }
            };
            var now = Date.now(),
                entry = lazyLogCache[name];

            if (value && value === entry.value) {
                return;
            }
            entry.value = value;

            if (interval > 0 && (now - entry.stamp) <= interval) {
                return;
            }
            entry.stamp = now;
            lazyLogCache[name] = entry;
            console.log(msg);
        };
    }).fail(() => {
        console.log("failed");
    })
}

function addChild() {
    var rootNode = $.ui.fancytree.getTree("#tree").getRootNode();
    rootNode.editCreateNode("child", "Node title");
}

function makeFolder() {
    var rootNode = $.ui.fancytree.getTree("#tree").getRootNode();
    var childNode = rootNode.addChildren({
        title: "Programatically addded nodes",
        tooltip: "This folder and all child nodes were added programmatically.",
        folder: true
    });
    //childNode.addChildren({
    //    title: "Document using a custom icon",
    //    icon: "customdoc1.gif"
    //});
}

function saveFile() {
    var tree = $.ui.fancytree.getTree("#tree");
    var d = [tree.toDict(true)];
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: "/member/edit",
        type: "POST",
        data: JSON.stringify(d),
        error: function (error) {
            console.log(error);
            alert("Error!");
        },
        success: function (data) {
            alert("success!");
        },
        complete: function (data) {
            alert("complete!");
        }
    })
}