"""
Camera package for the CatToyBot project.
"""

from .video import gen_frames, get_camera
from .mock_camera import create_mock_camera

__all__ = ['gen_frames', 'get_camera', 'create_mock_camera'] 