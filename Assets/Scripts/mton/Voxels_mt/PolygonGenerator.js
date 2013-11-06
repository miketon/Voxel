﻿#pragma strict

public var nVertices:Vector2[];
public var nTriangles:int[];

private var mesh:Mesh;
private var xform:Transform;

private var tUnit:float    = 0.5;
private var tStone:Vector2 = new Vector2 (0, 0);
private var tGrass:Vector2 = new Vector2 (0, 1);

function Start () {
  xform = transform;
  mesh = GetComponent(MeshFilter).mesh;
  
  var x:float = xform.position.x;
  var y:float = xform.position.y;
  var z:float = xform.position.z;

  var arrVertices:Array = new Array();   //positive x is to the right and negative y is down
  arrVertices.Push( Vector3 (x  , y  , z ));
  arrVertices.Push( Vector3 (x + 1 , y  , z ));
  arrVertices.Push( Vector3 (x + 1 , y-1  , z ));
  arrVertices.Push( Vector3 (x  , y-1  , z ));
  
  var arrTriangles:Array = new Array();
  //with Unity mesh class you create your triangles by adding the three points clockwise, 
  //this defines which direction is solid on your mesh
  arrTriangles.Push(0);
  arrTriangles.Push(1);
  arrTriangles.Push(3);
  arrTriangles.Push(1);
  arrTriangles.Push(2);
  arrTriangles.Push(3);
  
  var arrUV:Array = new Array();  
  //Unity's texture's 0,0 and 0,0 is the bottom left...WTH:Wish texture 0,0 were top left :(
  //To match vertice order : define the top left, then the top right, then the bottom right and last the bottom left.
  //To create the UV:defines what 4 corners of the texture you would like the four corners of the square to use
  arrUV.Push(Vector2(tUnit * tStone.x, tUnit * tStone.y + tUnit));
  arrUV.Push(Vector2(tUnit * tStone.x + tUnit, tUnit * tStone.y + tUnit));
  arrUV.Push(Vector2(tUnit * tStone.x + tUnit, tUnit * tStone.y));
  arrUV.Push(Vector2(tUnit * tStone.x, tUnit * tStone.y));

  mesh.Clear ();
  mesh.vertices  = arrVertices.ToBuiltin(Vector3) as Vector3[];
  mesh.uv = arrUV.ToBuiltin(Vector2) as Vector2[];
  mesh.triangles = arrTriangles.ToBuiltin(int) as int[];
  mesh.Optimize ();           //Optimizes the mesh for display?? Does no harm; doesn't spend cycles unnecessarily
  mesh.RecalculateNormals (); //Recalculates the normals of the mesh from the triangles and vertices.
}

/*
function Update () {
  // Get instantiated mesh
  var mesh : Mesh = GetComponent(MeshFilter).mesh;
  // Randomly change vertices
  var vertices : Vector3[] = mesh.vertices;
  for (var p : int = 0; p < vertices.Length; p++) {
    vertices[p] += Vector3(0, Random.Range(-0.3, 0.3), 0);
  }
  mesh.vertices = vertices;
  mesh.RecalculateNormals();
}
*/