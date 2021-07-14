---
name: Collide2Nav
description: A Godot game engine addon to simplify building navigable levels with complex collision geometry.
image: collide2nav.png
technologies:
  - godot
access: undefined
source: https://github.com/thefoxarmy/collide2nav
---


A tool to automatically generate navigation polygons based on collision objects.

The purpose of this plugin is to speed up level building especially when working with complex collisoin shapes and navigation paths. You only have to place collision polygons and it will generate the nav polygons for you. It attempts to find the exterior bounds of the scene's tilemaps and then generates navigation polygons that are inverse to the collission polygones so that characters can navigate everywhere they can't collide with.

